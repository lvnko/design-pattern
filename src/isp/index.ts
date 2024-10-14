// Interface segregation principle

interface Animal {
    eat() : void;
}

interface FlyingAnimal {
    fly() : void;
}

interface RunningAnimal {
    run() : void;
}

class Penguin implements Animal {
    eat = () => {};
}

class Ostrich implements Animal, RunningAnimal {
    eat = () => {};
    run = () => {};
}

class Eagle implements Animal, FlyingAnimal {
    eat = () => {};
    fly = () => {};
}