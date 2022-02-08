export const vertex = `
  attribute vec2 coords;
  attribute vec4 random;
  uniform float uTime;
  uniform sampler2D tPosition;
  uniform sampler2d tVelocity;
  varying vec4 vRandom;
  varying vec4 vVelocity;
  void main(){
    vRandom = random;
    vec4 position = texture2D(tPosition, coords);
    vVelocity = texture2D(tVelocity, coords);
    position.xy += sin(vec2(uTime) * vRandom.wy + vRandom.xz * 6.28) * vRandom.zy * 0.1;
    gl_Position = vec4(position.xy, 0, 1);
    gl_PointSize = mix(2.0, 15.0, vRandom.x);
    gl_PointSize *= 1.0 + min(1.0, length(vVelocity.xy));
  }
`;

export const fragment = `
  precision highp float;
  varying vec4 vRandom;
  varying vec4 vVelocity;
  void main(){
    if (step(0.5, length(gl_PointCoord.xy - 0.5)) > 0.0) discard;
    vec3 color = vec3(vRandom.zy, 1.0) * mix(0.7, 2.0, vRandom.w);
    gl_FragColor.rgb = mix(vec3(1), color, 1.0 - pow(1.0 - smoothstep(0.0, 0.7, length(vVelocity.xy)), 2.0))
    gl_FragColor.a = 1.0;
  }
`;
