var SHADER_EXERCISE = {

	onReady: function(){
		/************** Set up the scene **********************/
		// (2) Set the size of the container where we're going to be drawing things
		var WIDTH = 800, HEIGHT = 600;

    // (3) Instatiate the scene
		var scene = new THREE.Scene();

		// (4) Get a place on the webpage to put the scene
		var $container = $('#container');

		// (5) Set some camera attributes
		var CAMERA_ANGLE = 45;
		var ASPECT_RATIO = WIDTH / HEIGHT;
		var NEAR_PLANE = .1;
		var FAR_PLANE = 10000;

		// (6) Set-up a Camera
		var camera = new THREE.PerspectiveCamera(
			CAMERA_ANGLE,
			ASPECT_RATIO,
			NEAR_PLANE,
			FAR_PLANE
		);

		// (7) Put the camera somewhere useful
		camera.position.z = 300;

	  // (8) Create a WebGL Renderer
		var renderer = new THREE.WebGLRenderer();

		// (9) Tell the renderer how many pixels it has to work with
		renderer.setSize(WIDTH, HEIGHT);

		// (10) Link the renderer to the webpage
		$container.append(renderer.domElement);

	  /************ Now let's draw something! **********************/
		// (11) Create a material for our object
		// var cubeMaterial = new THREE.MeshPhongMaterial({
		// 	color: 0xCC0000
		// });
		var uniforms = {
			time: {type: 'f', value: 0}
		}
		var shaderMaterial = new THREE.ShaderMaterial({
			uniforms: uniforms,
			vertexShader: $("#vertexshader").text(),
			fragmentShader: $("#fragmentshader").text()
		});

		// (12) Define how finely we want to divide a cube mesh
		// var radius = 50, segments = 200, rings = 200;
		var width = 50, height = 50, depth = 50;

		// (13) Create a new mesh with cube geometry
		var cube = new THREE.Mesh(
			// new THREE.cubeGeometry(radius, segments, rings),
			new THREE.CubeGeometry(width, height, depth),
			shaderMaterial
		);

		// (14) Add the cube to the scene
		scene.add(cube);

		// (15) And the camera
		scene.add(camera);

		// (16) Create a point light
		var pointLight = new THREE.PointLight(0xFFFFFF);

		// (17) Put it somewhere
		pointLight.position.x = 10;
		pointLight.position.y = 50;
		pointLight.position.z = 130;

		// (18) Add the light to the scene
		scene.add(pointLight);

		// (19) Draw!
		var clock = new THREE.Clock;
		function render(){
			var d = clock.getDelta();

			renderer.render(scene, camera);
			cube.rotation.y -= d;
			cube.rotation.x -= d * 2;
			uniforms.time.value += 0.01;
			requestAnimationFrame(render);
		}
		render();
	}
}

$(document).ready( SHADER_EXERCISE.onReady );
