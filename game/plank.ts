
class Plank{
    p:Point;
    originalPoints:Point;
    height:number;
    width:number;
    image:HTMLImageElement;
    isDragable:boolean;
    isOnTop:boolean;
    status:string;
    constructor(startpt:Point,image:HTMLImageElement){
        this.p=startpt;
        this.originalPoints=this.p;
        this.image=image;

        this.height=this.image.height*0.7;
        this.width=this.image.width*0.8;
        this.status="outside"
        this.isOnTop=false;
    }

    draw(){
        ctx.drawImage(this.image,this.p.x,this.p.y,this.width,this.height)
    }

    isinside(pt:Point){
        if((pt.x>=this.p.x && pt.x<=this.p.x+this.width) && (pt.y>=this.p.y && pt.y<=this.p.y+this.height)){
           return true;
        }
    }
}