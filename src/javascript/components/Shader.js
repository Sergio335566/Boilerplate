window.shader = window.shader || {};
window.shader.images = {
    init: function() {
        'use strict';
        this.canvas = document.querySelector('.js-shader');
        this.gl = this.canvas.getContext('webgl');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.gl.viewport(0, 0, window.innerWidth, window.innerHeight)
        window.addEventListener('resize', this.onWindowResize.bind(this));
        if (!this.gl) {
            console.log('WebGL not supported, changing for experimental-webgl');
            this.gl = canvas.getContext('experimental-webgl');
        }

        if (!this.gl) {
            alert('Your browser does not support WebGL');
        }
        this.initShaders();
    },
    initShaders:function () {
        'use strict';
        // CREATION DU VERTEX
        this.vertexShaderText =
            [
                'precision mediump float;',
                '',
                'attribute vec2 vertPosition;',
                'attribute vec3 vertColor;',
                'varying vec3 fragColor;',
                '',
                'void main()',
                '{',
                '  fragColor = vertColor;',
                '  gl_Position = vec4(vertPosition, 0.0, 3.0);',
                '}'
            ].join('\n');
        // CREATION DU SHADER
        this.fragmentShaderText =
            [
                'precision mediump float;',
                '',
                'varying vec3 fragColor;',
                'void main()',
                '{',
                '  gl_FragColor = vec4(fragColor, .5);',
                '}'
            ].join('\n');
        this.createShaders();
    },
    createShaders: function () {
        'use strict';
        	console.log('This is working');
            // COULEUR DU FOND
        	this.gl.clearColor(0.1, 0.85, 0.8, 1.0);
        	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        	// AJOUT AU GL
        	this.vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        	this.fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);

        	this.gl.shaderSource(this.vertexShader, this.vertexShaderText);
        	this.gl.shaderSource(this.fragmentShader, this.fragmentShaderText);
            this.gl.compileShader(this.fragmentShader);
            this.gl.compileShader(this.vertexShader);
            this.createProgram();
        },
    createProgram: function () {
        'use strict';
        this.program = this.gl.createProgram();
        this.gl.attachShader(this.program, this.vertexShader);
        this.gl.attachShader(this.program, this.fragmentShader);
        this.gl.linkProgram(this.program);
        this.createBuffer();
    },
    createBuffer: function () {
        'use strict';
        // Objet et positions
    	this.triangleVertices =
    	[ // X, Y,       R, G, B
    		0.0, 0.5,    2.0, 1.0, 0.0,
    		-0.5, -0.5,  0.2, 0.0, 0.0,
    		0.5, -0.5,   0.1, 0.0, 0.6
    	];

    	this.triangleVertexBufferObject = this.gl.createBuffer();
    	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.triangleVertexBufferObject);
    	this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.triangleVertices), this.gl.STATIC_DRAW);

    	this.positionAttribLocation = this.gl.getAttribLocation(this.program, 'vertPosition');
    	this.colorAttribLocation = this.gl.getAttribLocation(this.program, 'vertColor');
    	this.gl.vertexAttribPointer(
    		this.positionAttribLocation, // Attribute location
    		2, // Number of elements per attribute
    		this.gl.FLOAT, // Type of elements
    		this.gl.FALSE,
    		5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
    		0 // Offset from the beginning of a single vertex to this attribute
    	);
    	this.gl.vertexAttribPointer(
    		this.colorAttribLocation, // Attribute location
    		3, // Number of elements per attribute
    		this.gl.FLOAT, // Type of elements
    		this.gl.FALSE,
    		5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
    		2 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
    	);

    	this.gl.enableVertexAttribArray(this.positionAttribLocation);
    	this.gl.enableVertexAttribArray(this.colorAttribLocation);
        this.render();
    },
    render: function() {
        'use strict';
        this.gl.useProgram(this.program);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
    },
    onWindowResize: function () {
        'use strict';
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.gl.viewport(0, 0, window.innerWidth, window.innerHeight)
    },
    tests: function () {
        if (!this.gl.getShaderParameter(this.vertexShader, this.gl.COMPILE_STATUS)) {
            console.error('ERROR compiling vertex shader!', this.gl.getShaderInfoLog(this.vertexShader));
            return;
        }
        if (!this.gl.getShaderParameter(this.fragmentShader, this.gl.COMPILE_STATUS)) {
            console.error('ERROR compiling fragment shader!', this.gl.getShaderInfoLog(this.fragmentShader));
            return;
        }
        if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
            console.error('ERROR linking program!', this.gl.getProgramInfoLog(this.program));
            return;
        }
        this.gl.validateProgram(this.program);
        if (!this.gl.getProgramParameter(this.program, this.gl.VALIDATE_STATUS)) {
            console.error('ERROR validating program!', this.gl.getProgramInfoLog(this.program));
            return;
        }
    },
    invoke: function () {
        'use strict';
        return {
            init: this.init.bind(this)
        };
    }
}.invoke();
