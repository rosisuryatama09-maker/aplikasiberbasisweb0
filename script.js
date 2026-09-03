// =====================================
// FOREST ADVENTURE 3D
// =====================================


// =====================================
// KONFIGURASI GOOGLE SHEETS
// =====================================

const API_URL =
    "MASUKKAN_URL_GOOGLE_APPS_SCRIPT_DI_SINI";


// =====================================
// VARIABEL GAME
// =====================================

let scene;
let camera;
let renderer;

let player;

let coins = [];

let score = 0;
let collectedCoins = 0;

let playerName = "";
let playerPhone = "";

let keys = {};


// =====================================
// VARIABEL JOYSTICK
// =====================================

let joystickX = 0;
let joystickY = 0;

let joystickActive = false;

const joystickRadius = 45;


// =====================================
// MULAI GAME
// =====================================

function startGame() {

    playerName =
        document
            .getElementById("username")
            .value
            .trim();


    playerPhone =
        document
            .getElementById("phone")
            .value
            .trim();


    if (playerName.length < 3) {

        alert(
            "Username minimal 3 karakter!"
        );

        return;

    }


    if (playerPhone.length < 8) {

        alert(
            "Masukkan nomor HP yang valid!"
        );

        return;

    }


    score = 0;

    collectedCoins = 0;


    document
        .getElementById("score")
        .innerText = score;


    document
        .getElementById("coinCount")
        .innerText = collectedCoins;


    document
        .getElementById("playerName")
        .innerText = playerName;


    document
        .getElementById("startScreen")
        .style.display = "none";


    document
        .getElementById("gameContainer")
        .style.display = "block";


    initGame();

}


// =====================================
// MEMBUAT DUNIA GAME
// =====================================

function initGame() {

    // SCENE

    scene =
        new THREE.Scene();


    scene.background =
        new THREE.Color(0x87ceeb);


    scene.fog =
        new THREE.Fog(

            0x87ceeb,

            30,

            100

        );


    // CAMERA

    camera =
        new THREE.PerspectiveCamera(

            70,

            window.innerWidth /
            window.innerHeight,

            0.1,

            1000

        );


    // RENDERER

    renderer =
        new THREE.WebGLRenderer({

            antialias: true

        });


    renderer.setSize(

        window.innerWidth,

        window.innerHeight

    );


    renderer.setPixelRatio(

        Math.min(
            window.devicePixelRatio,
            2
        )

    );


    document
        .getElementById("gameContainer")
        .appendChild(
            renderer.domElement
        );


    // CAHAYA

    const sunLight =
        new THREE.DirectionalLight(

            0xffffff,

            2

        );


    sunLight.position.set(

        20,

        30,

        10

    );


    scene.add(sunLight);


    const ambientLight =
        new THREE.AmbientLight(

            0xffffff,

            0.7

        );


    scene.add(
        ambientLight
    );


    // TANAH

    createGround();


    // PLAYER

    createPlayer();


    // POHON

    for (

        let i = 0;

        i < 45;

        i++

    ) {

        let x =
            Math.random() * 100 - 50;


        let z =
            Math.random() * 100 - 50;


        // JANGAN MEMBUAT POHON
        // TERLALU DEKAT PLAYER

        if (

            Math.abs(x) < 5 &&
            Math.abs(z) < 5

        ) {

            continue;

        }


        createTree(
            x,
            z
        );

    }


    // KOIN

    for (

        let i = 0;

        i < 20;

        i++

    ) {

        let x =
            Math.random() * 70 - 35;


        let z =
            Math.random() * 70 - 35;


        createCoin(
            x,
            z
        );

    }


    // EVENT KEYBOARD

    window.addEventListener(

        "keydown",

        function(event) {

            keys[event.key.toLowerCase()]
                = true;

        }

    );


    window.addEventListener(

        "keyup",

        function(event) {

            keys[event.key.toLowerCase()]
                = false;

        }

    );


    // JOYSTICK

    setupJoystick();


    // RESIZE

    window.addEventListener(

        "resize",

        onWindowResize

    );


    animate();

}


// =====================================
// TANAH
// =====================================

function createGround() {

    const geometry =
        new THREE.PlaneGeometry(

            150,

            150

        );


    const material =
        new THREE.MeshStandardMaterial({

            color: 0x2e7d32,

            roughness: 1

        });


    const ground =
        new THREE.Mesh(

            geometry,

            material

        );


    ground.rotation.x =
        -Math.PI / 2;


    scene.add(
        ground
    );

}


// =====================================
// PLAYER
// =====================================

function createPlayer() {

    const group =
        new THREE.Group();


    // BADAN

    const bodyGeometry =
        new THREE.BoxGeometry(

            1,

            1.5,

            0.8

        );


    const bodyMaterial =
        new THREE.MeshStandardMaterial({

            color: 0xff5722

        });


    const body =
        new THREE.Mesh(

            bodyGeometry,

            bodyMaterial

        );


    body.position.y = 1.5;


    group.add(
        body
    );


    // KEPALA

    const headGeometry =
        new THREE.SphereGeometry(

            0.55,

            16,

            16

        );


    const headMaterial =
        new THREE.MeshStandardMaterial({

            color: 0xffcc99

        });


    const head =
        new THREE.Mesh(

            headGeometry,

            headMaterial

        );


    head.position.y = 2.7;


    group.add(
        head
    );


    player = group;


    player.position.set(

        0,

        0,

        0

    );


    scene.add(
        player
    );

}


// =====================================
// POHON
// =====================================

function createTree(x, z) {

    const tree =
        new THREE.Group();


    // BATANG

    const trunkGeometry =
        new THREE.CylinderGeometry(

            0.4,

            0.6,

            4,

            10

        );


    const trunkMaterial =
        new THREE.MeshStandardMaterial({

            color: 0x6b3e1e

        });


    const trunk =
        new THREE.Mesh(

            trunkGeometry,

            trunkMaterial

        );


    trunk.position.y = 2;


    tree.add(
        trunk
    );


    // DAUN

    const leavesGeometry =
        new THREE.ConeGeometry(

            2.5,

            5,

            10

        );


    const leavesMaterial =
        new THREE.MeshStandardMaterial({

            color: 0x146b32

        });


    const leaves =
        new THREE.Mesh(

            leavesGeometry,

            leavesMaterial

        );


    leaves.position.y = 5;


    tree.add(
        leaves
    );


    tree.position.set(

        x,

        0,

        z

    );


    scene.add(
        tree
    );

}


// =====================================
// KOIN
// =====================================

function createCoin(x, z) {

    const geometry =
        new THREE.CylinderGeometry(

            0.5,

            0.5,

            0.15,

            24

        );


    const material =
        new THREE.MeshStandardMaterial({

            color: 0xffd700,

            metalness: 0.7,

            roughness: 0.3

        });


    const coin =
        new THREE.Mesh(

            geometry,

            material

        );


    coin.position.set(

        x,

        0.7,

        z

    );


    coin.rotation.x =
        Math.PI / 2;


    scene.add(
        coin
    );


    coins.push(
        coin
    );

}


// =====================================
// SETUP JOYSTICK
// =====================================

function setupJoystick() {

    const base =
        document.getElementById(
            "joystickBase"
        );


    const stick =
        document.getElementById(
            "joystickStick"
        );


    base.addEventListener(

        "pointerdown",

        function(event) {

            joystickActive = true;


            base.setPointerCapture(

                event.pointerId

            );


            updateJoystick(
                event
            );

        }

    );


    base.addEventListener(

        "pointermove",

        function(event) {

            if (
                joystickActive
            ) {

                updateJoystick(
                    event
                );

            }

        }

    );


    base.addEventListener(

        "pointerup",

        function() {

            resetJoystick();

        }

    );


    base.addEventListener(

        "pointercancel",

        function() {

            resetJoystick();

        }

    );


    function updateJoystick(event) {

        const rect =
            base.getBoundingClientRect();


        const centerX =
            rect.left +
            rect.width / 2;


        const centerY =
            rect.top +
            rect.height / 2;


        let deltaX =
            event.clientX -
            centerX;


        let deltaY =
            event.clientY -
            centerY;


        const distance =
            Math.sqrt(

                deltaX * deltaX +

                deltaY * deltaY

            );


        const maxDistance =
            joystickRadius;


        if (

            distance >
            maxDistance

        ) {

            const angle =
                Math.atan2(

                    deltaY,

                    deltaX

                );


            deltaX =
                Math.cos(angle) *
                maxDistance;


            deltaY =
                Math.sin(angle) *
                maxDistance;

        }


        stick.style.transform =
            `translate(${deltaX}px, ${deltaY}px)`;


        joystickX =
            deltaX /
            maxDistance;


        joystickY =
            deltaY /
            maxDistance;

    }


    function resetJoystick() {

        joystickActive = false;


        joystickX = 0;

        joystickY = 0;


        stick.style.transform =
            "translate(0px, 0px)";

    }

}


// =====================================
// GERAK PLAYER
// =====================================

function updatePlayer() {

    if (!player) return;


    const speed = 0.18;


    let moveX = 0;

    let moveZ = 0;


    // =============================
    // KEYBOARD
    // =============================

    if (

        keys["w"] ||
        keys["arrowup"]

    ) {

        moveZ -= 1;

    }


    if (

        keys["s"] ||
        keys["arrowdown"]

    ) {

        moveZ += 1;

    }


    if (

        keys["a"] ||
        keys["arrowleft"]

    ) {

        moveX -= 1;

    }


    if (

        keys["d"] ||
        keys["arrowright"]

    ) {

        moveX += 1;

    }


    // =============================
    // JOYSTICK
    // =============================

    moveX += joystickX;


    moveZ += joystickY;


    // =============================
    // NORMALISASI GERAK
    // =============================

    const length =
        Math.sqrt(

            moveX * moveX +

            moveZ * moveZ

        );


    if (

        length > 0

    ) {

        moveX /= length;

        moveZ /= length;


        player.position.x +=
            moveX * speed;


        player.position.z +=
            moveZ * speed;


        // PUTAR PLAYER
        // MENGIKUTI ARAH GERAK

        const angle =
            Math.atan2(

                moveX,

                moveZ

            );


        player.rotation.y =
            angle;

    }


    // BATAS AREA MAP

    player.position.x =
        Math.max(

            -70,

            Math.min(

                70,

                player.position.x

            )

        );


    player.position.z =
        Math.max(

            -70,

            Math.min(

                70,

                player.position.z

            )

        );


    // CAMERA MENGIKUTI PLAYER

    const cameraOffset =
        new THREE.Vector3(

            0,

            8,

            12

        );


    const targetCameraPosition =
        player.position.clone()
        .add(
            cameraOffset
        );


    camera.position.lerp(

        targetCameraPosition,

        0.08

    );


    camera.lookAt(

        player.position.x,

        player.position.y + 1,

        player.position.z

    );

}


// =====================================
// CEK KOIN
// =====================================

function checkCoins() {

    for (

        let i =
            coins.length - 1;

        i >= 0;

        i--

    ) {

        const coin =
            coins[i];


        const distance =
            player.position.distanceTo(

                coin.position

            );


        if (

            distance < 1.5

        ) {

            // HAPUS KOIN

            scene.remove(
                coin
            );


            coins.splice(
                i,
                1
            );


            // TAMBAH SKOR

            score += 10;


            collectedCoins++;


            document
                .getElementById(
                    "score"
                )
                .innerText =
                score;


            document
                .getElementById(
                    "coinCount"
                )
                .innerText =
                collectedCoins;


            // JIKA SEMUA KOIN
            // BERHASIL DIKUMPULKAN

            if (

                coins.length === 0

            ) {

                setTimeout(

                    function() {

                        alert(

                            "🎉 Selamat! Kamu berhasil mengumpulkan semua koin!"

                        );


                        finishGame();

                    },

                    500

                );

            }

        }

    }

}


// =====================================
// ANIMASI
// =====================================

function animate() {

    requestAnimationFrame(
        animate
    );


    if (player) {

        updatePlayer();

        checkCoins();

    }


    // ANIMASI KOIN

    coins.forEach(

        function(coin) {

            coin.rotation.y +=
                0.05;


            coin.position.y =
                0.7 +

                Math.sin(
                    Date.now() * 0.003 +
                    coin.position.x
                )
                * 0.15;

        }

    );


    renderer.render(

        scene,

        camera

    );

}


// =====================================
// RESIZE LAYAR
// =====================================

function onWindowResize() {

    if (
        !camera ||
        !renderer
    ) return;


    camera.aspect =
        window.innerWidth /
        window.innerHeight;


    camera.updateProjectionMatrix();


    renderer.setSize(

        window.innerWidth,

        window.innerHeight

    );

}


// =====================================
// SELESAI GAME
// =====================================

function finishGame() {

    if (

        confirm(

            `Permainan selesai!

Skor kamu: ${score}

Simpan skor ke leaderboard?`

        )

    ) {

        saveScore();

    }

}


// =====================================
// SIMPAN KE GOOGLE SHEETS
// =====================================

function saveScore() {

    if (

        API_URL ===
        "MASUKKAN_URL_GOOGLE_APPS_SCRIPT_DI_SINI"

    ) {

        alert(

            "Masukkan URL Google Apps Script terlebih dahulu!"

        );

        return;

    }


    const data = {

        username:
            playerName,

        phone:
            playerPhone,

        score:
            score

    };


    fetch(

        API_URL,

        {

            method: "POST",

            body:
                JSON.stringify(
                    data
                )

        }

    )

    .then(

        response =>
            response.json()

    )

    .then(

        result => {

            alert(

                "🎉 Skor berhasil disimpan!"

            );


            location.reload();

        }

    )

    .catch(

        error => {

            console.error(
                error
            );


            alert(

                "Gagal menyimpan skor. Periksa koneksi Google Apps Script."

            );

        }

    );

}


// =====================================
// TAMPILKAN LEADERBOARD
// =====================================

function showLeaderboard() {

    document
        .getElementById(
            "leaderboardScreen"
        )
        .style.display =
        "flex";


    const leaderboardData =
        document.getElementById(
            "leaderboardData"
        );


    leaderboardData.innerHTML =
        "⏳ Memuat leaderboard...";


    if (

        API_URL ===
        "MASUKKAN_URL_GOOGLE_APPS_SCRIPT_DI_SINI"

    ) {

        leaderboardData.innerHTML =
            "⚠️ URL Google Apps Script belum dimasukkan.";

        return;

    }


    fetch(
        API_URL
    )

    .then(

        response =>
            response.json()

    )

    .then(

        data => {

            if (

                data.length === 0

            ) {

                leaderboardData.innerHTML =
                    "Belum ada data pemain.";

                return;

            }


            let html = "";


            data.forEach(

                function(

                    player,

                    index

                ) {

                    let medal = "";


                    if (
                        index === 0
                    ) {

                        medal = "🥇";

                    }

                    else if (
                        index === 1
                    ) {

                        medal = "🥈";

                    }

                    else if (
                        index === 2
                    ) {

                        medal = "🥉";

                    }

                    else {

                        medal =
                            "#" +
                            (
                                index + 1
                            );

                    }


                    html += `

                        <div class="leaderboardItem">

                            <span class="rank">

                                ${medal}

                            </span>

                            <span>

                                ${escapeHTML(player.username)}

                            </span>

                            <span class="playerScore">

                                ${player.score} 🪙

                            </span>

                        </div>

                    `;

                }

            );


            leaderboardData.innerHTML =
                html;

        }

    )

    .catch(

        error => {

            console.error(
                error
            );


            leaderboardData.innerHTML =
                "❌ Gagal mengambil data leaderboard.";

        }

    );

}


// =====================================
// KEAMANAN TEXT
// =====================================

function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text;


    return div.innerHTML;

}


// =====================================
// TUTUP LEADERBOARD
// =====================================

function cl
