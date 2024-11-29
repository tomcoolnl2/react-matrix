uniform vec2 u_resolution;
uniform vec3 u_color;

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution; 
  gl_FragColor = vec4(u_color, 1.0);
}