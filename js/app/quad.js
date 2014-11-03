define( [ 'gl', 'utils', 'shader!quad.vert', 'shader!quad.frag' ], function ( gl, utils, quadVert, quadFrag ) {
  var quad = {
    init: function() {
      console.log( 'Initialized quad with context', gl );

      // Create shader program for quad
      var program = utils.createProgram( quadVert.value, quadFrag.value );
      gl.useProgram( program );

      // Get handle on coordinate attribute in shader
      var coordinate = gl.getAttribLocation( program, 'coordinate' );

      // Create a buffer to will hold the quad vertex data (defined in clip-space)
      var buffer = gl.createBuffer();
      gl.bindBuffer( gl.ARRAY_BUFFER, buffer );

      // Define 2 triangles that will form our quad
      quad.vertices = new Float32Array( [
        -1.0, -1.0, 1.0, -1.0, -1.0,  1.0, // 1st triangle
        -1.0, 1.0, 1.0, -1.0, 1.0,  1.0 // 2nd triangle
      ] );

      // Put vertices into buffer
      gl.bufferData( gl.ARRAY_BUFFER, quad.vertices, gl.STATIC_DRAW );
      gl.enableVertexAttribArray( coordinate );
      gl.vertexAttribPointer( coordinate, 2, gl.FLOAT, false, 0, 0 );
    },
    draw: function () {
      gl.drawArrays( gl.TRIANGLES, 0, quad.vertices.length / 2 );
    }
  };

  quad.init();
  return quad;
} );
