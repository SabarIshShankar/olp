import * as OGL from 'ogl'
import { useState, useLayoutEffect } from 'react'
import { useOGL, useFrame, Canvas } from 'react-ogl/web'
import { vertex, fragment, positionFragment, velocityFragment } from './shaders'

const numParticles = 65536
const initialPositionData = new Float32Array(numParticles * 4)
const initialVelocityData = new Float32Array(numParticles * 4)
const random = new Float32Array(numParticles * 4)

for (let i = 0; i < numParticles; i++) {
  initialPositionData.set([(Math.random() - 0.5) * 2.0, (Math.random() - 0.5) * 2.0, 0, 1], i * 4)
  initialVelocityData.set([0, 0, 0, 1], i * 4)
  random.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4)
}

function useGPGPU(data) {
  const { gl } = useOGL()
  const [gpgpu] = useState(() => new OGL.GPGPU(gl, { data }))
  useFrame(() => gpgpu.render())
  return gpgpu
}

function Points({ time = 0 }) {
  const { gl } = useOGL()
  const [mouse] = useState(() => new OGL.Vec2())
  const position = useGPGPU(initialPositionData)
  const velocity = useGPGPU(initialVelocityData)

  useLayoutEffect(() => {
    position.addPass({
      fragment: positionFragment,
      uniforms: { uTime: { value: time }, tVelocity: velocity.uniform },
    })
    velocity.addPass({
      fragment: velocityFragment,
      uniforms: { uTime: { value: time }, uMouse: { value: mouse }, tPosition: position.uniform },
    })
  }, [position, velocity, mouse])

  useFrame((state, t) => {
    time = t * 0.001
    mouse.copy(state.mouse)
  })

  return (
    <mesh mode={gl.POINTS}>
      <geometry random={{ size: 4, data: random }} coords={{ size: 2, data: position.coords }} />
      <program
        vertex={vertex}
        fragment={fragment}
        uniforms={{ uTime: { value: time }, tPosition: position.uniform, tVelocity: velocity.uniform }}
      />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas camera={{ fov: 45, position: [0, 0, 5] }}>
      <Points />
    </Canvas>
  )
}
