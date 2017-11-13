function Ball(name) {
    this.name = name;
    if(name == "A") {
        this.mass = 5;
        this.radius = 4;
        this.color = "#309480";
    }
    else if(name == "B"){
        this.mass = 7;
        this.radius = 7;
        this.color = "#D96459"
    }
    else if (name == "C"){
        this.mass = 10;
        this.radius = 10;
        this.color = "#33BDFF"
    }
    //this.count = 0;
    this.rowNumber = 1;
    this.x = this.radius + 1;
    this.y = Math.random()*100;
    this.vx = Math.random() * 3;
    this.vy = Math.random() * 2;
    this.draw = function (context) {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2*Math.PI, true);
        context.closePath();
        context.fill();
    };
};