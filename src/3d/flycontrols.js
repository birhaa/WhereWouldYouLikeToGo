
import * as THREE from 'three';



    export default function ( object, domElement, opts ) {



        opts = opts || {};

        domElement = ( domElement !== undefined ) ? domElement : document;
        if ( domElement ) domElement.setAttribute( 'tabindex', -1 );

        // API

        let movementSpeed = (opts.movementSpeed === undefined) ? 1.0 : opts.movementSpeed;
        let movementSpeedMultiplier = 0;
        let rollSpeed = (opts.rollSpeed === undefined) ? 0.005 : opts.rollSpeed;

        let dragToLook = true;
        let autoForward = false;

        // disable default target object behavior

        // internals

        let tmpQuaternion = new THREE.Quaternion();

        let mouseStatus = 0;

        let moveState = { up: 0, down: 0, left: 0, right: 0, forward: 0, back: 0, pitchUp: 0, pitchDown: 0, yawLeft: 0, yawRight: 0, rollLeft: 0, rollRight: 0 };
        let moveVector = new THREE.Vector3( 0, 0, 0 );
        let rotationVector = new THREE.Vector3( 0, 0, 0 );

        var prevTime = Date.now();


        let handleEvent = function ( event ) {

            if ( typeof this[ event.type ] == 'function' ) {

                this[ event.type ]( event );

            }

        };

        let keydown = function( event ) {

            if ( event.altKey ) {

                return;

            }



            switch ( event.keyCode ) {

                case 16: /* shift */ movementSpeedMultiplier = .1; break;

                case 87: /*W*/ moveState.forward = 1; break;
                case 83: /*S*/ moveState.back = 1; break;

                case 65: /*A*/ moveState.left = 1; break;
                case 68: /*D*/ moveState.right = 1; break;

                case 82: /*R*/ moveState.up = 1; break;
                case 70: /*F*/ moveState.down = 1; break;

                case 38: /*up*/ moveState.pitchUp = 1; break;
                case 40: /*down*/ moveState.pitchDown = 1; break;

                case 37: /*left*/ moveState.yawLeft = 1; break;
                case 39: /*right*/ moveState.yawRight = 1; break;

                case 81: /*Q*/ moveState.rollLeft = 1; break;
                case 69: /*E*/ moveState.rollRight = 1; break;

            }

            var surpress = [38, 40, 37, 39];

            if(surpress.indexOf(event.keyCode) > -1) {
                event.preventDefault();
            }

            updateMovementVector();
            updateRotationVector();

        };

        let keyup = function( event ) {

            switch( event.keyCode ) {

                case 16: /* shift */ movementSpeedMultiplier = 1; break;

                case 87: /*W*/ moveState.forward = 0; break;
                case 83: /*S*/ moveState.back = 0; break;

                case 65: /*A*/ moveState.left = 0; break;
                case 68: /*D*/ moveState.right = 0; break;

                case 82: /*R*/ moveState.up = 0; break;
                case 70: /*F*/ moveState.down = 0; break;

                case 38: /*up*/ moveState.pitchUp = 0; break;
                case 40: /*down*/ moveState.pitchDown = 0; break;

                case 37: /*left*/ moveState.yawLeft = 0; break;
                case 39: /*right*/ moveState.yawRight = 0; break;

                case 81: /*Q*/ moveState.rollLeft = 0; break;
                case 69: /*E*/ moveState.rollRight = 0; break;

            }

            updateMovementVector();
            updateRotationVector();

        };

        let mousedown = function( event ) {

            if ( domElement !== document ) {

                domElement.focus();

            }

            event.preventDefault();
            event.stopPropagation();

            if ( dragToLook ) {

                mouseStatus ++;

            } else {

                switch ( event.button ) {

                    case 0: moveState.forward = 1; break;
                    case 2: moveState.back = 1; break;

                }

                updateMovementVector();

            }

        };

        let mousemove = function( event ) {

            if ( !dragToLook || mouseStatus > 0 ) {

                var container = getContainerDimensions();
                var halfWidth  = container.size[ 0 ] / 2;
                var halfHeight = container.size[ 1 ] / 2;

                moveState.yawLeft   = - ( ( event.pageX - container.offset[ 0 ] ) - halfWidth  ) / halfWidth;
                moveState.pitchDown =   ( ( event.pageY - container.offset[ 1 ] ) - halfHeight ) / halfHeight;

                updateRotationVector();

            }

        };


        let mouseout = function( event ) {

            event.preventDefault();
            event.stopPropagation();
            moveState = { up: 0, down: 0, left: 0, right: 0, forward: 0, back: 0, pitchUp: 0, pitchDown: 0, yawLeft: 0, yawRight: 0, rollLeft: 0, rollRight: 0 };
            updateRotationVector();
            updateMovementVector();
        };

        let mouseup = function( event ) {

            event.preventDefault();
            event.stopPropagation();

            if ( dragToLook ) {

                mouseStatus --;

                moveState.yawLeft = moveState.pitchDown = 0;

            } else {

                switch ( event.button ) {

                    case 0: moveState.forward = 0; break;
                    case 2: moveState.back = 0; break;

                }

                updateMovementVector();

            }

            updateRotationVector();

        };

        let update = function( delta ) {

            var time = Date.now();
            var delta = ( time - prevTime ) / 10;

            var moveMult = delta * movementSpeed;
            var rotMult = delta * rollSpeed;

            object.translateX( moveVector.x * moveMult );
            object.translateY( moveVector.y * moveMult );
            object.translateZ( moveVector.z * moveMult );

            tmpQuaternion.set( rotationVector.x * rotMult, rotationVector.y * rotMult, rotationVector.z * rotMult, 1 ).normalize();
            object.quaternion.multiply( tmpQuaternion );

            // expose the rotation vector for convenience
            object.rotation.setFromQuaternion( object.quaternion, object.rotation.order );

            prevTime = time;
        };

        let updateMovementVector = function() {

            var forward = ( moveState.forward || ( autoForward && !moveState.back ) ) ? 1 : 0;

            moveVector.x = ( -moveState.left    + moveState.right );
            moveVector.y = ( -moveState.down    + moveState.up );
            moveVector.z = ( -forward + moveState.back );

            //console.log( 'move:', [ moveVector.x, moveVector.y, moveVector.z ] );

        };

        let updateRotationVector = function() {

            rotationVector.x = ( -moveState.pitchDown + moveState.pitchUp );
            rotationVector.y = ( -moveState.yawRight  + moveState.yawLeft );
            rotationVector.z = ( -moveState.rollRight + moveState.rollLeft );

            //console.log( 'rotate:', [ rotationVector.x, rotationVector.y, rotationVector.z ] );

        };

      let   getContainerDimensions = function() {

            if ( domElement != document ) {

                return {
                    size    : [ domElement.offsetWidth, domElement.offsetHeight ],
                    offset  : [ domElement.offsetLeft,  domElement.offsetTop ]
                };

            } else {

                return {
                    size    : [ window.innerWidth, window.innerHeight ],
                    offset  : [ 0, 0 ]
                };

            }

        };



        function bind( scope, fn ) {

            return function () {

                fn.apply( scope, arguments );

            };

        };

        domElement.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );

        domElement.addEventListener( 'mousemove', bind( this, mousemove ), false );
        domElement.addEventListener( 'mousedown', bind( this, mousedown ), false );
        domElement.addEventListener( 'mouseup',   bind( this, mouseup ), false );
        domElement.addEventListener( 'mouseout',   bind( this, mouseout ), false );

        domElement.addEventListener( 'keydown', bind( this, keydown ), false );
        domElement.addEventListener( 'keyup',   bind( this, keyup ), false );

        updateMovementVector();
        updateRotationVector();
    };
