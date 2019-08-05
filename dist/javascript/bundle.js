/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/javascript/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/javascript/components/Shader.js":
/*!*********************************************!*\
  !*** ./src/javascript/components/Shader.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("window.shader = window.shader || {};\nwindow.shader.images = {\n  init: function init() {\n    'use strict';\n\n    this.canvas = document.querySelector('.js-shader');\n    this.gl = this.canvas.getContext('webgl');\n    this.canvas.width = window.innerWidth;\n    this.canvas.height = window.innerHeight;\n    this.gl.viewport(0, 0, window.innerWidth, window.innerHeight);\n    window.addEventListener('resize', this.onWindowResize.bind(this));\n\n    if (!this.gl) {\n      console.log('WebGL not supported, changing for experimental-webgl');\n      this.gl = canvas.getContext('experimental-webgl');\n    }\n\n    if (!this.gl) {\n      alert('Your browser does not support WebGL');\n    }\n\n    this.initShaders();\n  },\n  initShaders: function initShaders() {\n    'use strict'; // CREATION DU VERTEX\n\n    this.vertexShaderText = ['precision mediump float;', '', 'attribute vec2 vertPosition;', 'attribute vec3 vertColor;', 'varying vec3 fragColor;', '', 'void main()', '{', '  fragColor = vertColor;', '  gl_Position = vec4(vertPosition, 0.0, 3.0);', '}'].join('\\n'); // CREATION DU SHADER\n\n    this.fragmentShaderText = ['precision mediump float;', '', 'varying vec3 fragColor;', 'void main()', '{', '  gl_FragColor = vec4(fragColor, .5);', '}'].join('\\n');\n    this.createShaders();\n  },\n  createShaders: function createShaders() {\n    'use strict';\n\n    console.log('This is working'); // COULEUR DU FOND\n\n    this.gl.clearColor(0.1, 0.85, 0.8, 1.0);\n    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT); // AJOUT AU GL\n\n    this.vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);\n    this.fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);\n    this.gl.shaderSource(this.vertexShader, this.vertexShaderText);\n    this.gl.shaderSource(this.fragmentShader, this.fragmentShaderText);\n    this.gl.compileShader(this.fragmentShader);\n    this.gl.compileShader(this.vertexShader);\n    this.createProgram();\n  },\n  createProgram: function createProgram() {\n    'use strict';\n\n    this.program = this.gl.createProgram();\n    this.gl.attachShader(this.program, this.vertexShader);\n    this.gl.attachShader(this.program, this.fragmentShader);\n    this.gl.linkProgram(this.program);\n    this.createBuffer();\n  },\n  createBuffer: function createBuffer() {\n    'use strict'; // Objet et positions\n\n    this.triangleVertices = [// X, Y,       R, G, B\n    0.0, 0.5, 2.0, 1.0, 0.0, -0.5, -0.5, 0.2, 0.0, 0.0, 0.5, -0.5, 0.1, 0.0, 0.6];\n    this.triangleVertexBufferObject = this.gl.createBuffer();\n    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.triangleVertexBufferObject);\n    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.triangleVertices), this.gl.STATIC_DRAW);\n    this.positionAttribLocation = this.gl.getAttribLocation(this.program, 'vertPosition');\n    this.colorAttribLocation = this.gl.getAttribLocation(this.program, 'vertColor');\n    this.gl.vertexAttribPointer(this.positionAttribLocation, // Attribute location\n    2, // Number of elements per attribute\n    this.gl.FLOAT, // Type of elements\n    this.gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex\n    0 // Offset from the beginning of a single vertex to this attribute\n    );\n    this.gl.vertexAttribPointer(this.colorAttribLocation, // Attribute location\n    3, // Number of elements per attribute\n    this.gl.FLOAT, // Type of elements\n    this.gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex\n    2 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute\n    );\n    this.gl.enableVertexAttribArray(this.positionAttribLocation);\n    this.gl.enableVertexAttribArray(this.colorAttribLocation);\n    this.render();\n  },\n  render: function render() {\n    'use strict';\n\n    this.gl.useProgram(this.program);\n    this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);\n  },\n  onWindowResize: function onWindowResize() {\n    'use strict';\n\n    this.canvas.width = window.innerWidth;\n    this.canvas.height = window.innerHeight;\n    this.gl.viewport(0, 0, window.innerWidth, window.innerHeight);\n  },\n  tests: function tests() {\n    if (!this.gl.getShaderParameter(this.vertexShader, this.gl.COMPILE_STATUS)) {\n      console.error('ERROR compiling vertex shader!', this.gl.getShaderInfoLog(this.vertexShader));\n      return;\n    }\n\n    if (!this.gl.getShaderParameter(this.fragmentShader, this.gl.COMPILE_STATUS)) {\n      console.error('ERROR compiling fragment shader!', this.gl.getShaderInfoLog(this.fragmentShader));\n      return;\n    }\n\n    if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {\n      console.error('ERROR linking program!', this.gl.getProgramInfoLog(this.program));\n      return;\n    }\n\n    this.gl.validateProgram(this.program);\n\n    if (!this.gl.getProgramParameter(this.program, this.gl.VALIDATE_STATUS)) {\n      console.error('ERROR validating program!', this.gl.getProgramInfoLog(this.program));\n      return;\n    }\n  },\n  invoke: function invoke() {\n    'use strict';\n\n    return {\n      init: this.init.bind(this)\n    };\n  }\n}.invoke();\n\n//# sourceURL=webpack:///./src/javascript/components/Shader.js?");

/***/ }),

/***/ "./src/javascript/index.js":
/*!*********************************!*\
  !*** ./src/javascript/index.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_Shader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Shader.js */ \"./src/javascript/components/Shader.js\");\n/* harmony import */ var _components_Shader_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_Shader_js__WEBPACK_IMPORTED_MODULE_0__);\n//IMPORTS\n\n/*global window, document */\n\ndocument.addEventListener(\"DOMContentLoaded\", function (event) {\n  window.shader.images.init();\n  console.log(\"I love your curiosity :) -\", \"www.serge-bocancea.fr\");\n});\n\n//# sourceURL=webpack:///./src/javascript/index.js?");

/***/ })

/******/ });