/**
 * Personaje principal del juego. Hereda de la clase Character.
 * @extends Character
 */
class Player extends Character {
    /**
     * Inicializa un jugador
     * @param game {Game} La instancia del juego al que pertenece el personaje
     */
    constructor(game) {
        const height = PLAYER_HEIGHT * game.width / 100,
            width = PLAYER_WIDTH * game.width / 100,
            x = game.width / 2 - width / 2,
            y = game.height - height,
            speed = PLAYER_SPEED,
            myImage = PLAYER_PICTURE,
            myImageDead = PLAYER_PICTURE_DEAD;

        super(game, width, height, x, y, speed, myImage, myImageDead);

        this.updatesPerShot = 10;
        this.updatesPerShotCount = 0;
        this.dragging = false;
        this.initDraggingAbility();

        this.lives = INIT_LIVES; //vidas del jugador
        this.setLives();
    }

    //se setea la cantidad de vidas restantes
    setLives() {
        let lives = document.getElementsByClassName('amount');
        lives[0].innerHTML = this.lives;
    }



    /**
     * Actualiza los atributos de posición del jugador y los disparos en función de las teclas pulsadas
     */
    update() {
        if (!this.dead && !this.dragging) {
            switch (this.game.keyPressed) {
                case KEY_LEFT:
                    if (this.x > this.speed) {
                        this.x -= this.speed;
                    }
                    break;
                case KEY_RIGHT:
                    if (this.x < this.game.width - this.width - this.speed) {
                        this.x += this.speed;
                    }
                    break;
                case KEY_SHOOT:
                    this.game.shoot(this);
                    break;
            }
        }


        /**
         * In case game is touchable...
         */
        if (!this.dead) {
            this.updatesPerShotCount++;
            if (this.updatesPerShotCount % this.updatesPerShot == 0) {
                this.game.shoot(this);
            }
        }
    }


    /**
     * In case game is touchable...
     */
    initDraggingAbility() {
        let interactable = interact(this.myImageContainer);

        interactable.draggable({
            listeners: {
                start: ev => {

                },
                move: ev => {
                    this.x += ev.delta.x;
                    if (this.x > MAX_X) this.x = MAX_X
                    if (this.x < MIN_X) this.x = MIN_X
                },
                end: ev => {

                }
            }
        })
    }



    /**
     * Mata al jugador
     */
    die() {

        if (!this.dead) {
            //descontar vida

            this.lives--;
            this.setLives();

            // si tiene 0 vedas se termina el juego
            if (this.lives === 0) {
                setTimeout(() => {
                    this.game.endGame();
                }, 2000);
                super.die();

            } else {
                // si tiene más vidas vuelve a aparecer después de unos segundos
                super.die();
                setTimeout(() => {
                    this.dead = false;
                    this.myImage.src = PLAYER_PICTURE;

                }, 2000);

            }
        }
    }
}
