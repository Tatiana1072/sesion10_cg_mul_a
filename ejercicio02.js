// create a scene, that will hold all our elements such as objects, cameras and lights. 
var scene = new THREE.Scene();

function cubo(x, y, z, color, material, alambrado){
    var cubeGeometry = new THREE.BoxGeometry(x, y, z);
    var cubeMaterial;
    switch(material){
     case 'Basic': cubeMaterial = new THREE.MeshBasicMaterial({color: color, wireframe: alambrado});
      break;

     case 'Standard': cubeMaterial = new THREE.MeshStandardMaterial({color: color, wireframe: alambrado});
      break;

     case 'Physical': cubeMaterial = new THREE.MeshPhysicalMaterial({color: color, wireframe: alambrado});
      break;

     case 'Phong': cubeMaterial = new THREE.MeshPhongMaterial({color: color, wireframe: alambrado});
      break;

     case 'Lambert': cubeMaterial = new THREE.MeshLambertMaterial({color: color, wireframe: alambrado});
      break;
    }
    
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

    // add the cube to the scene
    scene.add(cube);
    return(cube);
}

/*function rotate(obj, anguloX, anguloY, anguloZ){
obj.rotate.set(obj.rotate.x + anguloX,obj.rotate.y + anguloY, obj.rotate.z + anguloZ );
}*/

function init() {
    // create a scene, that will hold all our elements such as objects, cameras and lights.

    // create a camera, which defines where we're looking at.
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    // create a render and set the size
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // show axes in the screen
    var axes = new THREE.AxesHelper(20);
    scene.add(axes);

    Cubo = [];   // Definir un array unidimensional
    dim = 4;
    Cubo.push(cubo(dim, dim, dim, 0xFFDD00, 'Physical', false));
    Cubo.push(cubo(dim, dim, dim, 0xFF0000, 'Standard', false));
    Cubo.push(cubo(dim, dim, dim, 0xFF0000, 'Phong', false));


    delta=10;
    Cubo[0].translateY(delta);//traslada el objeto a lo largo del eje x a 10 unidades de distancia
    Cubo[1].translateX(delta);//traslada el objeto a lo largo del eje y
    Cubo[2].translateZ(delta);//traslada el objeto a lo largo del eje z

/*//rotacion
angulo= Math.PI/2;
rotate(Cubo[0], angulo, 0, 0);*/

//rotacion
angulo= Math.PI/2;
Cubo[0].rotation.x=angulo;
Cubo[1].rotation.y=angulo;
Cubo[2].rotation.z=angulo;


    //Luz (requerida para el material MeshLambertMaterial)
    light = new THREE.PointLight(0xFFFF00); //  Luz proveniente de un punto en el espacio, 
		                                //  semejante al sol.
    light.position.set( -10, 30, 10 );             //  Localización de la luz. (x, y, z).
    scene.add( light ); 

    // position and point the camera to the center of the scene
    camera.position.set(20, 30, 30);
    camera.lookAt(scene.position);

    // add the output of the renderer to the html element
    document.getElementById("webgl-output").appendChild(renderer.domElement);

    // render the scene
    renderer.render(scene, camera);
}

