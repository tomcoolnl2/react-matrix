
#pragma glslify: cnoise3 = require(glsl-noise/classic/3d)
#pragma glslify: pnoise3 = require(glsl-noise/periodic/3d)

uniform float u_time;

varying vec2 vUv;
varying float noise;
varying float displacement;

uniform float u_frequency;

void main() {
  vUv = uv;

  noise = 3.0 * pnoise3(position + u_time, vec3(10.0));
  displacement = (u_frequency / 100.0) * (noise / 10.0);

  vec3 newPosition = position + normal * displacement;

  vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}