var start;
var game;

var playerX;
var playerY;


var dx4 = [1,0,-1, 0];
var dy4 = [0, 1, 0, -1];

var dx8 = [ -1, 0, 1, -1, 1, -1, 0, 1 ];
var dy8 = [ 1, 1, 1, 0, 0, -1, -1, -1 ];

var grey = "#666";
var white = "#FFF";

var first_pageswitch = 0;

var score = 0;

Glyph = function (chr, foreground, background) {
    this._char = chr || ' ';
    this._foreground = foreground || '#666';
    this._background = background || 'white';
};
Glyph.prototype.getChar = function () {
    return this._char;
}
Glyph.prototype.getBackground = function () {
    if (game._current_room._id == 3 && this._background == "white")
        return "#000";
    else
        return this._background;
}
Glyph.prototype.getForeground = function () {
    if (game._current_room._id == 3 && this._foreground == "#666")
        return "#999999";
    else
        return this._foreground;
}


Tile = function (glyph, passable) {
    this._glyph = glyph;
    this._passable = passable;
};
Tile.prototype.getGlyph = function () {
    return this._glyph;
};

Tile.nullTile = new Tile(new Glyph(' '));
Tile.floorTile = new Tile(new Glyph('.'), true);
Tile.floor1Tile = new Tile(new Glyph(','), true);
Tile.floor2Tile = new Tile(new Glyph(' '), true);
Tile.floor3Tile = new Tile(new Glyph('+'), true);
Tile.floor4Tile = new Tile(new Glyph('`', 'green'), true);
Tile.floor5Tile = new Tile(new Glyph('.'), true);
Tile.cavewallTile = new Tile(new Glyph('#'));
Tile.walltlTile = new Tile(new Glyph('╔'));
Tile.wallhTile = new Tile(new Glyph('═'));
Tile.wallvTile = new Tile(new Glyph('║'));
Tile.wallblTile = new Tile(new Glyph('╚'));
Tile.walltrTile = new Tile(new Glyph('╗'));
Tile.wallbrTile = new Tile(new Glyph('╝'));

Tile.walllurTile = new Tile(new Glyph('╩'));
Tile.wallldrTile = new Tile(new Glyph('╦'));
Tile.wallurdTile = new Tile(new Glyph('╠'));
Tile.wallludTile = new Tile(new Glyph('╣'));
Tile.counter = new Tile(new Glyph('|'));


Tile.dirtTile = new Tile(new Glyph('~','brown'),true);
Tile.bloodTile = new Tile(new Glyph('~', '#8B0000'), true);
Tile.computerTile = new Tile(new Glyph('©'));
Tile.stoolTile = new Tile(new Glyph('o','blue'), true);
Tile.tableTile = new Tile(new Glyph('┬', 'brown'));

var Entity = function (locX, locY) {
    this.stage = 0;
    this.glyph = new Glyph("x", 'black', 'white');
    this.locX = locX;
    this.locY = locY;
    this.block = false;
    this.finished = false;
};
Entity.prototype.getLocX = function () {
    return this.locX;
};
Entity.prototype.getLocY = function () {
    return this.locY;
};
Entity.prototype.getGlyph = function () {
    return this.glyph;
};
Entity.prototype.interact = function () {
    return;
};
Entity.prototype.blockPath = function () {
    return this.block;
};
Entity.prototype.stepOn = function () {
    return;
};
Entity.prototype.update = function () {

};


function IntroScroll(locX, locY) {
    Entity.call(this, locX, locY);
    this.glyph = new Glyph('?', 'red', 'white');
};

IntroScroll.prototype = Object.create(Entity.prototype);
IntroScroll.prototype.constructor = IntroScroll;
IntroScroll.prototype.interact = function () {
    $("#room0_info").hide();
    $("#room0_info").html("The top of the <span class='red'>pamplet (?)</span> states 'Welcome to the <span class ='important'>Museum of Roguelikes!</span>'<br><br> 'A what like?' you ask yourself and you look for clues on the pamphlet for a means of escape. <br><br>You continue reading the pamplet.<br><br> You see that the museum is split into two sections. The door to the south apparently leads some exhibits about <span class ='important'>rougelike concepts</span> and the door to the east leads to exhibits regarding <span class ='important'>rougelike design</span>.<br><br>'But I don't want to know any of those things...'")
    $("#room0_info").show("slow");
    if (this.finished == false)
        score += 10;
    this.finished = true;
};

function Door(locX, locY) {
    Entity.call(this, locX, locY);
};
Door.prototype = Object.create(Entity.prototype);
Door.prototype.constructor = Door;
Door.prototype.getGlyph = function () {
    if(this.stage == 0)
        return new Glyph('+', 'brown', 'white')
    else
        return new Glyph('/', 'brown', 'white')
};
Door.prototype.interact = function () {
    if (this.stage == 0)
        this.stage = 1
};
Door.prototype.blockPath = function () {
    if (this.stage == 0)
        return true;
    else
        return false;
};

function Torch(locX, locY) {
    Entity.call(this, locX, locY);
    this.block = true;
};

Torch.prototype = Object.create(Entity.prototype);
Torch.prototype.constructor = Torch;
Torch.prototype.getGlyph = function () {
    if (this.stage == 0)
        return new Glyph('^', 'orange', 'white')
    else
        return new Glyph('^', 'red', 'white')
};
Torch.prototype.update = function () {
    this.stage = Math.floor((Math.random() * 2));
}
Torch.prototype.interact = function () {
    current_info().hide();
    current_info().html("It's a <span class='orange'>torch (^)</span> that lights the room!")
    current_info().show("slow");
};

function Statue(locX, locY) {
    Entity.call(this, locX, locY);
    this.glyph = new Glyph('Ω', 'black', 'white');
    this.block = true;
};
Statue.prototype = Object.create(Entity.prototype);
Statue.prototype.constructor = Statue;
Statue.prototype.interact = function () {
    $("#room0_info").hide();
    $("#room0_info").html("The object before you is a giant stone slab 'Ω' with an very detailed image chiseled on it. It looks quite familiar, actually it looks quite like you '@' ! ")
    $("#room0_info").show("slow");
    $("#room0_tab1").show("slow");
    if (this.finished == false)
        score += 10;
    this.finished = true;
};

function TheFountain(locX, locY) {
    Entity.call(this, locX, locY);
    this.glyph = new Glyph('O', 'black', 'white');
    this.block = true;
};
TheFountain.prototype = Object.create(Entity.prototype);
TheFountain.prototype.constructor = TheFountain;
TheFountain.prototype.interact = function () {
    $("#room0_info").hide();
    $("#room0_info").html("You see a what looks to be a... a common urinal (O)? You look closer and see the words <span class ='important'>'the fountain'</span> scribbled on a crumpled piece of paper lying beside it. What is this doing here? Why would someone put a urinal in the middle of a museum?<br><br> You spend several minutes contemplating the meaning of art and context before remembering the goal at hand...")
    $("#room0_info").show("slow");
    $("#room0_tab0").show("slow");
    if (this.finished == false)
        score += 10;
    this.finished = true;
};

function SpookyCube(locX, locY)
{
    Entity.call(this, locX, locY);
    this.glyph = new Glyph('■', 'white', 'black');
    this.block = true;
};
SpookyCube.prototype = Object.create(Entity.prototype);
SpookyCube.prototype.constructor = SpookyCube;
SpookyCube.prototype.interact = function () {
    $("#room3_info").hide();
    $("#room3_info").html("You examine the <span class='white'>large cube (■)</span> and see an image engraved and painted on one side. It's a gorgeous ASCII rendering of a sun with a face.<br><br> ")
    $("#room3_info").show("slow");
    $("#room3_tab0").show("slow");
    $("#room3_tab1").show("slow");
    if (this.finished == false)
        score += 10;
    this.finished = true;
};

function SpookyCubeSign(locX, locY) {
    Entity.call(this, locX, locY);
    this.glyph = new Glyph('￥', 'white', 'black');
    this.block = true;
};
SpookyCubeSign.prototype = Object.create(Entity.prototype);
SpookyCubeSign.prototype.constructor = SpookyCubeSign;
SpookyCubeSign.prototype.interact = function () {
    $("#room3_info").hide();
    $("#room3_info").html("You see a <span class='white'>large sign (￥)</span> infront of you.<br><br> It reads: 'The creative use of characters and wise use of color allows for a wide range of expression. However, even the use of a single character allows for just as much expression. The use of ASCII characters in modern roguelikes isn't just for nostalgia's sake, it's an efficent way to stimulate the player.' <br><br> The bottom of the page contains a print out of the article of Mark R. Johnson, <a target='_blank' href='http://gac.sagepub.com/content/early/2015/05/15/1555412015585884.abstract'>The Use of ASCII Graphics in Roguelikes.</a>")
    $("#room3_info").show("slow");
    if (this.finished == false)
        score += 10;
    this.finished = true;
};

function ScreenTransfer(locX, locY,target,dir, newPlayerLocX,newPlayerLocY) {
    Entity.call(this, locX, locY);
    this.target = target;
    this.dir = dir;
    this.newPlayerLocX = newPlayerLocX;
    this.newPlayerLocY = newPlayerLocY;
    if(dir == 0)
        this.glyph = new Glyph("↓", 'red', 'white');
    if(dir == 2)
        this.glyph = new Glyph("↑", 'red', 'white');
    if (dir == 1)
        this.glyph = new Glyph("←", 'red', 'white');
    if (dir == 3)
        this.glyph = new Glyph("→", 'red', 'white');
};
ScreenTransfer.prototype = Object.create(Entity.prototype);
ScreenTransfer.prototype.constructor = ScreenTransfer;
ScreenTransfer.prototype.stepOn = function () {
    transition("room" + this.target, this.dir, this.target);
    game._current_room.enter(this.newPlayerLocX, this.newPlayerLocY);
};


function DeadDwarf(locX, locY) {
    Entity.call(this, locX, locY);
    this.glyph = new Glyph('d', '#8B0000', 'white');
    this.block = true;
};
DeadDwarf.prototype = Object.create(Entity.prototype);
DeadDwarf.prototype.constructor = DeadDwarf;
DeadDwarf.prototype.interact = function () {
    current_info().hide();
    current_info().html("It's a <span class='red2'>dead dwarf (d)</span> in a pool of <span class='red2'>blood (~)</span>! What could have happened here?")
    current_info().show("slow");
};

function CrazyDwarf(locX, locY) {
    Entity.call(this, locX, locY);
    this.glyph = new Glyph('d', 'black', 'white');
    this.block = true;
};
CrazyDwarf.prototype = Object.create(Entity.prototype);
CrazyDwarf.prototype.constructor = CrazyDwarf;
CrazyDwarf.prototype.interact = function () {
    current_info().hide();
    current_info().html("The <span>dwarf (d)</span> in front of you wanders around aimlessly stark raving mad.")
    current_info().show("slow");
    if (this.finished == false)
        score += 10;
    this.finished = true;
};
CrazyDwarf.prototype.update = function () {
    if(Math.floor((Math.random() * 3)) == 0)
    {
        var t = Math.floor((Math.random() * 4));
        var newX = this.locX + dx4[t];
        var newY = this.locY + dy4[t];

        if (game._current_room._map.getTile(newX, newY)._passable)
        {
            this.locX = newX;
            this.locY = newY;
        }
    }
}

function Diary(locX, locY) {
    Entity.call(this, locX, locY);
    this.glyph = new Glyph('?', 'red', 'white');
};

Diary.prototype = Object.create(Entity.prototype);
Diary.prototype.constructor = IntroScroll;
Diary.prototype.interact = function () {
    current_info().hide();
    current_info().html("You look down and see a <span class='red'>blood stained journal (?)</span>.<br><br> You open to the first page and a picture falls out. <br><br>You skim through the pages and notice how every page is written by a different author.<br><br> It seems to depect the <a href='http://lparchive.org/Dwarf-Fortress-Boatmurdered/' target='_blank'>rise and fall of a dwarven fortress</a>")
    current_info().show("slow");
    $("#room4_tab0").show("slow");
    $("#room4_tab1").show("slow");
    if (this.finished == false)
        score += 10;
    this.finished = true;
};


function HistoryOfRoguelikes(locX, locY) {
    Entity.call(this, locX, locY);
    this.glyph = new Glyph('?', 'purple', 'white');
};

HistoryOfRoguelikes.prototype = Object.create(Entity.prototype);
HistoryOfRoguelikes.prototype.constructor = HistoryOfRoguelikes;
HistoryOfRoguelikes.prototype.interact = function () {
    current_info().hide();
    current_info().html("You pick up a <span class='purple'>poster (?)</span> on the ground.<br><br> It shows the history of roguelikes. You can see that it starts with the game called Rogue and then splits off into a bunch of different games influenced by the original. Neat! ")
    current_info().show("slow");
    $("#room2_tab1").show("slow");
    if (this.finished == false)
        score += 10;
    this.finished = true;
};

function Sevendayrl(locX, locY) {
    Entity.call(this, locX, locY);
    this.glyph = new Glyph('?', 'red', 'white');
};

Sevendayrl.prototype = Object.create(Entity.prototype);
Sevendayrl.prototype.constructor = Sevendayrl;
Sevendayrl.prototype.interact = function () {
    current_info().hide();
    current_info().html("You see a promotional poster for the <a href='http://7drl.org/' target='_blank'>seven day roguelike</a> event.<br><br> It's actually going on right now! It says that the seven day roguelike event is where developers try to create a new roguelike in seven days, and then get judged by the community.  Apparently this room is being used for developers to gather, exchange ideas, and develop their games.")
    current_info().show("slow");
    $("#room2_tab0").show("slow");
    if (this.finished == false)
        score += 10;
    this.finished = true;
};

function Watch(locX, locY) {
    Entity.call(this, locX, locY);
    this.glyph = new Glyph('"', 'orange', 'white');
};

Watch.prototype = Object.create(Entity.prototype);
Watch.prototype.constructor = IntroScroll;
Watch.prototype.interact = function () {
    current_info().hide();
    current_info().html("You look down and see a <span class='orange'>pocket watch (&quot;)</span>. The hands don't seem to be moving. <br><br> But now that you think of it, time only seems to be moving when you move!")
    current_info().show("slow");
    $("#room6_tab0").show("slow");
    $("#room6_tab1").show("slow");
    if (this.finished == false)
        score += 10;
    this.finished = true;
};


function Computer(locX, locY) {
    Entity.call(this, locX, locY);
    this.glyph = new Glyph('©');
    this.block = true;
};

Computer.prototype = Object.create(Entity.prototype);
Computer.prototype.constructor = Computer;

function Stool(locX, locY) {
    Entity.call(this, locX, locY);
    this.glyph = new Glyph('o');
};

Stool.prototype = Object.create(Entity.prototype);
Stool.prototype.constructor = Stool;

function Human(locX, locY) {
    Entity.call(this, locX, locY);
    this.glyph = new Glyph('H','black');
};

Human.prototype = Object.create(Entity.prototype);
Human.prototype.constructor = Human;
Human.prototype.interact = function () {
    current_info().hide();
    current_info().html("You see a young guy (H) typing away on a computer.<br><br>You ask him what hes doing and he explains how he's creating a roguelike for the 7 day roguelike competition. He tells you that hes creating an <a href='http://rephial.org/' target='_blank'>Angband</a> variant with influences from <a href='https://crawl.develz.org/' target='_blank'>Dungeon Crawl Stone Soup</a>.<br><br> You ask him how to get out and he told you to leave him alone!")
    current_info().show("slow");
    if (this.finished == false)
        score += 10;
    this.finished = true;
};

function Rat(locX, locY) {
    Entity.call(this, locX, locY);
    this.glyph = new Glyph('r', 'black', 'white');
};
Rat.prototype = Object.create(Entity.prototype);
Rat.prototype.constructor = Rat;
Rat.prototype.interact = function () {
    current_info().hide();
    current_info().html("It's a tiny rat! (r)")
    current_info().show("slow");
};
Rat.prototype.update = function () {
    if (Math.floor((Math.random() * 2)) == 0) {
        var t = Math.floor((Math.random() * 4));
        var newX = this.locX + dx4[t];
        var newY = this.locY + dy4[t];

        if (game._current_room._map.getTile(newX, newY)._passable) {
            this.locX = newX;
            this.locY = newY;
        }
    }
}

function VendingMachine(locX, locY) {
    Entity.call(this, locX, locY);
    this.glyph = new Glyph('&', 'red', 'white');
    this.block = true;
}
VendingMachine.prototype = Object.create(Entity.prototype);
VendingMachine.prototype.constructor = VendingMachine;
VendingMachine.prototype.interact = function () {
    current_info().hide();
    current_info().html("It's a <span class='red'>vending machine (&)</span>, wow!<br><br> Isn't it weird how everything takes up just one tile?")
    current_info().show("slow");
    if (this.finished == false)
        score += 5;
    this.finished = true;
};

function DesignDiagarm(locX, locY) {
    Entity.call(this, locX, locY);
    this.glyph = new Glyph('?', 'purple', 'white');
}
DesignDiagarm.prototype = Object.create(Entity.prototype);
DesignDiagarm.prototype.constructor = DesignDiagarm;
DesignDiagarm.prototype.interact = function () {
    current_info().hide();
    current_info().html("You pick up the <span class='purple'>collection papers (?)</span> on the ground. <br><br> They describe a method for <a href='http://pcg.wikidot.com/pcg-algorithm:dungeon-generation' target='_blank'>generating dungeons on a 2D grid</a>!")
    current_info().show("slow");

    $("#room5_tab0").show("slow");
    $("#room5_tab1").show("slow");
    if (this.finished == false)
        score += 10;
    this.finished = true;
};

function LockedDoor(locX, locY) {
    Entity.call(this, locX, locY);
    this.glyph = new Glyph('+','brown');
}
LockedDoor.prototype = Object.create(Entity.prototype);
LockedDoor.prototype.constructor = LockedDoor;
LockedDoor.prototype.interact = function () {
    current_info().hide();
    if (game._current_room._flag == 0)
        current_info().html("The <span class='brown'>door (+)</span> doesn't move at all! You hear sounds of boobs and beeps from the computer (©) nearby.");
    else {
        current_info().html("The door swings open!");
        this.stage = 1;
    }
    current_info().show("slow");

    $("#room5_tab0").show("slow");
    $("#room5_tab1").show("slow");
};
LockedDoor.prototype.getGlyph = function () {
    if (this.stage == 0)
        return new Glyph('+', 'brown', 'white')
    else
        return new Glyph('/', 'brown', 'white')
};
LockedDoor.prototype.blockPath = function () {
    if (this.stage == 0)
        return true;
    else
        return false;
};

function DoorComputer(locX, locY) {
    Entity.call(this, locX, locY);
    this.glyph = new Glyph('©');
}
DoorComputer.prototype = Object.create(Entity.prototype);
DoorComputer.prototype.constructor = DoorComputer;
DoorComputer.prototype.interact = function () {
    if (this.stage == 0) {
        current_info().hide();
        current_info().html("The computer (©) lets out a boop followed by a few beeps<br><br>The message 'To escape you must answer following question...press enter to continue.'<br><br>");
        this.stage = 1;
        current_info().show("slow");
        return;
    }
    if (this.stage == 1) {
        current_info().hide();
        current_info().html("You press enter and it outputs the question 'Which of the following is the most important aspect of a roguelike?'<br><br>1.Replability<br>2.Symbols and context<br>3.Decision making<br>4.Remixing other's content<br><br> 'Waiting for input...' ");
        this.stage = 2;
        current_info().show("slow");
        return;
    }
    if (this.stage == 2) {
        current_info().hide();
        current_info().html("The computer lets out two big beeps and outputs <span class='red'>'WRONG'</span> on the terminal. <br><br>'The content is randomly generated, the symbols are used to engross the user, time steps are used as a way to emphasize decision making, and the remix culture is what keeps roguelikes alive today. However, at the core, a roguelike is a game that is full of <span class='important'>lexia</span>, and it's up to the user to navigate and to investigate that lexia by connections placed within a maze... press enter to continue.'<br><br>");
        this.stage = 3;
        current_info().show("slow");
        return;
    }
    if (this.stage == 3) {
        current_info().hide();
        current_info().html("'Now that you know what makes a roguelike what it is, you're now free to go!'<br><br>The computer makes a few happy sounding beeps and boops and the door makes a click sound");
        this.stage = 3;
        if (this.finished == false)
            score += 25;
        this.finished = true;

        game._current_room._flag = 1;
        $("#room7_tab0").show("slow");
        $("#room7_tab1").show("slow");
        $("#room7_tab2").show("slow");
        current_info().show("slow");
        $("#header").hide();
        return;
    }
};

function EscapeSign(locX, locY) {
    Entity.call(this, locX, locY);
    this.glyph = new Glyph('￥');
    this.block = true;
};
EscapeSign.prototype = Object.create(Entity.prototype);
EscapeSign.prototype.constructor = EscapeSign;
EscapeSign.prototype.interact = function () {
    current_info().hide();
    current_info().html("It's a large sign (￥), it says the stairwell to the ground floor is right around the corner!")
    current_info().show("slow");
};


function Escape(locX, locY) {
    Entity.call(this, locX, locY);
    this.glyph = new Glyph("<", 'red', 'white');
};
Escape.prototype = Object.create(Entity.prototype);
Escape.prototype.constructor = Escape;
Escape.prototype.stepOn = function () {
    $("#final_score").html(score);
    transition("outro", 2);
};


Map = function (_type) {
    this._tiles = [];
    this._width = 38;
    this._height = 15;
    this.data =
        ["*************#.#***********************",
            "*************#.#***********************",
            "*********╔═══#.#═══╗*******************",
            "*********║.........║*******************",
            "***╔═════╝.........╚═════╗*************",
            "***║.....................║*************",
            "***║.....................##############",
            "***║...................................",
            "***║.....................##############",
            "***║.....................║*************",
            "***╚═════╗.........╔═════╝*************",
            "*********║.........║*******************",
            "*********╚═════════╝*******************",
            "***************************************",
            "***************************************",
            "***************************************"];
    //start
   if (_type == 0) {
        this._width = 38;
        this._height = 15;
        this.data =
            [   "***************************************",
                "***************************************",
                "**╔════════════════╗*******************",
                "**║++++++++++++++++║*******************",
                "**║+........, .....╠═════════════╗*****",
                "**║+......... .,...║+++++++++++++║*****",
                "**║+. .... . ......║ ... ...    +║#####",
                "**║+.. .. ..,.....,.. .  ..    ........",
                "**║+... . .........║ . .. . .  .+║#####",
                "**║+...........,...║+++++++++++++║*****",
                "**╚══════╗.........╠═════════════╝*****",
                "*********║...., ...║*******************",
                "*********╚════.════╝*******************",
                "*************#.#***********************",
                "*************#.#***********************",
                "*************#.#***********************"];

   }
   if (_type == 1) {

   }
   if (_type == 2) {
       this._width = 57;
       this._height = 15;
       this.data =
           [   "********#.#**********************************************",
               "********#.#**********************************************",
               "***╔═════.═══════════════════╗***************************",
               "***║+++++++++++++++++++++++++║***************************",
               "***║+..,......., ..  .. . ..+╚════════════════════╗******",
               "***║+..,...,.. .,.. ..,.....++++++++++++++++++++++║******",
               "***║+ ....  o© ┬o.....     ......,...,........   +║######",
               "***║+. ..,.   ,.  ,., .  ,.    .,...  ... .,.............",
               "***║+ . ,.. o┬ ┬o ...... .. .....  ..   ...  .,..+║######",
               "***║+.....,  ..  ,.,   ..............    ......  +║******",
               "***║+ .... . ..,...........+++++++++++++++++++++++║******",
               "***║+.  ...... ,, ...  ....+╔═════════════════════╝******",
               "***║++++++++++++++++++++++++║****************************",
               "***╚════════════════════════╝****************************",
               "*********************************************************",
               "*********************************************************"];
   }
   if (_type == 3) {
       this._width = 38;
       this._height = 15;
       this.data =
              ["*************#.#***********************",
               "*************#.#***********************",
               "***╔═════════#.#═══════════════╗*******",
               "***║+++++++++++++++++++++++++++║*******",
               "***║+... ...╔  .╗.. .. .......+║*******",
               "***║+... .......... ,.........+║*******",
               "***║+.,.. ... ........... ....+║*******",
               "***║+............. ...  .......║*******",
               "***║+.,.....╚...╝......,+++++++║*******",
               "***║+++++++.......+++++++╔═#.#═╝*******",
               "***╚═════╗+..,....+╔═════╝*#.#*********",
               "*********║++++.++++║*******#.#####*****",
               "*********╚════.════╝*******#.....#*****",
               "*************#.#***********#####.#*****",
               "*************#.#***************#.#*****",
               "*************#.#***************#.#*****"];

   }
   if (_type == 4) {
       this._width = 57;
       this._height = 15;
       this.data =
           [   "***********************#.#*******************************",
               "**********##***********#.#*******************************",
               "***#######..##***#######.####****************************",
               "**#..,...,....###............#**###************######****",
               "***###.,......., ..  .. . ...#*#...####********#.. ..#***",
               "***#...,...,.. .,.. ..b.b....##...,....########.b#####***",
               "**##. .... .  .. ..... bb  ......,...,........ bbb#******",
               "####.. ..,..,.....,., .  b.    .,...##... .,.########****",
               "..... . ,..b.,.......... .. .....  ...#,...##.......#****",
               "#####.....bbb..  ,.,   ......###.....####......##..#*****",
               "***###.... .b..,...........##...#####****#......##.###***",
               "******###..... ,, ...  ...#***************##.###*#...#***",
               "*********#################******************#****###.#***",
               "****************************************************#****",
               "*********************************************************",
               "*********************************************************"];
   }
   if (_type == 5) {
       this._width = 38;
       this._height = 15;
       this.data =
              ["*************#.#***********************",
               "*************#.#***********************",
               "*********╔═══#.#════════════════╗******",
               "*********║0000000000000000000000║******",
               "***╔═════╝0000000000000000000000║******",
               "***║00000000000000o0000000000000║******",
               "***║00000000o┬o00o┬o000000╔══.══╣******",
               "***║00000000000000o0000000║|++++║******",
               "***║0000┬o0000000000o00000║|++++║******",
               "***║0000o00000000000┬o0000║═══.═║******",
               "***╠════════╗0000000000000║+++++║******",
               "***║0000000000000000000000║+++++║******",
               "***╚════════╩═════════════╩═════╝******",
               "***************************************",
               "***************************************",
               "***************************************"];
           }
    if (_type == 6) {
        this._width = 38;
        this._height = 16;
        this.data =
        ["***************************************",
         "***╔══════════════╦════════════╗*╔═╗***",
         "***║..............║............╚═╝.╚═╗*",
         "*╔═╝.╔══════.═╦═══╩═══.══════╗.......║*",
         "*║...║........║...........╔══╝.══════╣*",
         "*║.╔═╣..╔═════╝.════════╗.║..........║*",
         "═╝.╚═║.╔╝...............║.║.╔══════╗.║*",
         ".....║.║..║.═╗..╔══+══╗.║.║.║..... ║.╚═",
         "═╗.══╣.╚╗.║..╠══╝+++++╚═╩═╣.╚═....╔╝...",
         "*║...╠══╝.╚╦═╝.+++++++++..║....╔═.╚╦═╦═",
         "*╠══.║.....║...╔╗+++++╔..╔╩═══.║...║.║*",
         "*║...║.╔═╦═╩══.║╚═════╝..║.....╠╦══╝.║*",
         "*║.║.║.║*║.....║.........║.╔═╗.║║....║*",
         "*║.╚═╝.╚═╝.══╗.║.════════╝.╚═╝.╚╝.╔══╝*",
         "*║...........║.║..................║****",
         "*╚═══════════╝.╚══════════════════╝****"];
    }
    if (_type == 7) {
        this._width = 38;
        this._height = 15;
        this.data =
               ["***************************************",
                "***************************************",
                "***************************************",
                "***********************╔═══════╗*******",
                "***********************║+++++++║*******",
                "*╔═════════════════════╩═══.═══╩═╗*****",
                "*║...............................║*****",
                "*║...............................║*****",
                "*║...............................║*****",
                "*╚╗.╔════════════════════════════╝*****",
                "**║.║**********************************",
                "══╝.║**********************************",
                "....║**********************************",
                "════╝**********************************",
                "***************************************",
                "***************************************"];
    }
    if (_type == 8) {

    }
    for (var x = 0; x < this._width; x++) {
        this._tiles.push([]);
        for (var y = 0; y < this._height; y++) {
            this._tiles[x].push(Tile.nullTile);
        }
    }

        for (var y = 0; y < this._height; y++) {
            for (var x = 0; x < this._width; x++) {
                var c = this.data[y].charAt(x);
                switch(c)
                {
                    case '.':
                        this._tiles[x][y] = Tile.floorTile;
                        break;
                    case '#':
                        this._tiles[x][y] = Tile.cavewallTile;
                        break;
                    case '╔':
                        this._tiles[x][y] = Tile.walltlTile;
                        break;
                    case '═':
                        this._tiles[x][y] = Tile.wallhTile;
                        break;
                    case '║':
                        this._tiles[x][y] = Tile.wallvTile;
                        break;
                    case '╚':
                        this._tiles[x][y] = Tile.wallblTile;
                        break;
                    case '╗':
                        this._tiles[x][y] = Tile.walltrTile;
                        break;
                    case '╝':
                        this._tiles[x][y] = Tile.wallbrTile;
                        break;
                    case ',':
                        this._tiles[x][y] = Tile.floor1Tile;
                        break;
                    case ' ':
                        this._tiles[x][y] = Tile.floor2Tile;
                        break;
                    case '+':
                        this._tiles[x][y] = Tile.floor3Tile;
                        break;
                    case 'b':
                        this._tiles[x][y] = Tile.bloodTile;
                        break;
                    case 'o':
                        this._tiles[x][y] = Tile.stoolTile
                        break;
                    case '©':
                        this._tiles[x][y] = Tile.computerTile;
                        break;
                    case '┬':
                        this._tiles[x][y] = Tile.tableTile;
                        break;

                    case '╩':
                        this._tiles[x][y] = Tile.walllurTile;
                        break;

                    case '╦':
                        this._tiles[x][y] = Tile.wallldrTile;
                        break;

                    case '╠':
                        this._tiles[x][y] = Tile.wallurdTile;
                        break;

                    case '╣':
                        this._tiles[x][y] = Tile.wallludTile;
                        break;
                    case '0':
                        this._tiles[x][y] = Tile.floor5Tile;
                        break;
                    case '|':
                        this._tiles[x][y] = Tile.counter;
                        break;
                }
            }
        }
};
Map.prototype.getWidth = function () {
    return this._width;
};
Map.prototype.getHeight = function () {
    return this._height;
};
Map.prototype.getTile = function (x, y) {
    if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
        return Tile.nullTile;
    } else {
        return this._tiles[x][y] || Tile.nullTile;
    }
};


Room = function (num) {
    this._id = num;
    this._stage = 0;
    this._display = null;
    this._map = new Map(this._id);
    this._entities = [];
    this._flag = 0;
    this._finished = false;
    if (num == 0) {
        this._display = new ROT.Display({
            width: 38,
            height: 15
        });
        this._entities.push(new IntroScroll(6, 8));
        this._entities.push(new Door(14, 12));
        this._entities.push(new Door(33, 7));
        this._entities.push(new Door(19, 7));
        this._entities.push(new ScreenTransfer(14, 14, 3, 0, 14, 0));
        this._entities.push(new ScreenTransfer(37, 7, 6, 3, 0, 7));
        this._entities.push(new Torch(3,9));
        this._entities.push(new Torch(3, 3));
        this._entities.push(new Statue(13, 5));
        this._entities.push(new TheFountain(24, 7));
    }
    if (num == 1) {
        this._display = new ROT.Display({
            width: 50,
            height: 15
        });
    }
    if(num == 2)
    {
        this._display = new ROT.Display({
            width: 60,
            height: 15
        });
        this._entities.push(new Human(12, 6));
        this._entities.push(new HistoryOfRoguelikes(17, 10));
        this._entities.push(new Sevendayrl(6, 5));
        this._entities.push(new ScreenTransfer(9, 0, 3, 2, 14, 14));
        this._entities.push(new ScreenTransfer(56, 7, 4, 3, 0, 8));
    }
    if (num == 3) {
        this._display = new ROT.Display({
            width: 38,
            height: 15
        });
        this._entities.push(new SpookyCube(14, 6));
        this._entities.push(new ScreenTransfer(14, 14, 2, 0, 9, 0));

        this._entities.push(new ScreenTransfer(14, 0, 0, 2, 14, 14));
        this._entities.push(new ScreenTransfer(32, 14, 4, 0, 24, 0));
        this._entities.push(new SpookyCubeSign(9, 6));
    }
    if (num == 4) {
        this._display = new ROT.Display({
            width: 60,
            height: 15
        });
        this._entities.push(new ScreenTransfer(24, 0, 3, 2, 32, 14));
        this._entities.push(new ScreenTransfer(0, 8, 2, 1, 56, 7));
        this._entities.push(new DeadDwarf(11, 8));
        this._entities.push(new DeadDwarf(48, 6));
        this._entities.push(new CrazyDwarf(15, 6));
        this._entities.push(new Diary(16, 9));
    }
    if (num == 5) {
        this._display = new ROT.Display({
            width: 35,
            height: 15
        });
        this._entities.push(new ScreenTransfer(14, 0, 6, 2, 14, 15));
        this._entities.push(new Door(12, 11));
        this._entities.push(new Door(29, 6));
        this._entities.push(new Door(30, 9));
        this._entities.push(new VendingMachine(4, 6));
        this._entities.push(new DesignDiagarm(13, 9));
    }
    if (num == 6) {
        this._display = new ROT.Display({
            width: 50,
            height: 17
        });
        this._entities.push(new ScreenTransfer(0, 7, 0, 1, 37, 7));
        this._entities.push(new ScreenTransfer(14, 15, 5, 0, 14, 0));
        this._entities.push(new ScreenTransfer(37, 8, 7, 3, 0, 12));
        this._entities.push(new Rat(9, 6));
        this._entities.push(new Rat(6, 4));
        this._entities.push(new Rat(2, 7));
        this._entities.push(new Rat(10, 14));
        this._entities.push(new Rat(19, 6));
        this._entities.push(new Rat(25, 9));
        this._entities.push(new Rat(35, 12));
        this._entities.push(new Watch(20, 10));
    }
    if (num == 7) {
        this._display = new ROT.Display({
            width: 34,
            height: 15
        });
        this._entities.push(new ScreenTransfer(0, 12, 6, 1, 37, 8));
        this._entities.push(new EscapeSign(3, 6));
        this._entities.push(new LockedDoor(27, 5));
        this._entities.push(new DoorComputer(22, 6));
        this._entities.push(new Escape(24, 4));
    }
    if (num == 8) {
        this._display = new ROT.Display({
            width: 50,
            height: 15
        });
    }
    $("#room" + this._id + "_game").append(this._display.getContainer());
};
Room.prototype.enter = function (x, y) {
    playerX = x;
    playerY = y;
    current_info().hide();
    if (this._id == 0)
    {
        if (this._stage == 0) {
            current_info().html("On your way home from school you suddenly fall through the sidewalk and find yourself in the middle of a modern art museum. 'I don't want any of this, I just want to go home' you say to yourself.<br><br>You look around and you see a scroll <span class='red'>'?'</span> lying on the floor. Maybe try reading it? or don't.");
            this._stage = 1;
        }
        else
        {
            current_info().html("You enter the art museum");
        }
    }
    if (this._id == 2)
    {
        if (this._stage == 0) {
            current_info().html("You enter a large room with a few <span class='brown'>tables (┬)</span>. It smells like pizza and sweat. <br><br> You see a person (H) typing away on a laptop (©).");
            this._stage = 1;
        }
        else {
            current_info().html("7 day roguelike development room.");
        }
    }
    if (this._id == 3)
    {
        if (this._stage == 0) {
            if (first_pageswitch == 0) {
                current_info().html("You stepped on a <span class='red'>red arrow (→)</span> on the ground, and like as if you clicked on a hypertext link, you find yourself teleported onto another page.<br><br>The room is dark and there is a large <span class='white'>cube like structure (■)</span> in the center surrounded by columns.");
                first_pageswitch = 1;
            }
            else
            {
                current_info().html("The room is dark and there is a large <span class='white'>cube like structure (■)</span> in the center surrounded by columns.");
            }
            this._stage = 1;
        }
        else {
            current_info().html("You enter the room of ASCII art");
        }
    }
    if (this._id == 4)
    {
        if (this._stage == 0) {
            current_info().html("You enter a large room that looks like it's been caved out by hand.<br><br>You see a small man (d) walking around in circles and <span class='red2'>several others (d)</span> lying on the ground in pools of what looks to be <span class='red2'>blood (~)</span>! ");
            this._stage = 1;
        }
        else 
        {
            current_info().html("You enter the dwarven cave.");
        }
    }
    if (this._id == 5) {
        if (this._stage == 0) {
            current_info().html("You enter what looks to be some sort of break room!");
            this._stage = 1;
        }
        else {
            current_info().html("You enter the break room.");
        }
    }
    if (this._id == 6) {
        if (this._stage == 0) {
            if (first_pageswitch == 0) {
                current_info().html("You stepped on a <span class='red'>red arrow (→)</span> on the ground, and like as if you clicked on a hypertext link, you find yourself teleported onto another page.<br><br>You enter a large room which looks like a labyrinth.<br><br> It seems to be infested with rats (r)!");
                first_pageswitch = 1;
            }
            else {
                current_info().html("You enter a large room which looks like a labyrinth.<br><br> It seems to be infested with rats (r)!");
            }
            this._stage = 1;
        }
        else {
            current_info().html("You enter the labyrinth.");
        }
    }
    if (this._id == 7) {
        if (this._stage == 0) {
                current_info().html("You enter what looks to be the hallway to escape.");
            this._stage = 1;
        }
        else {
            current_info().html("You enter the escape hallway.");
        }
    }
    current_info().show("slow");

    if (this._finished == false && this._id!=0)
        score += 10;
    this._finished = true;
}
Room.prototype.render = function () {
    var screenWidth = this._display.getOptions().width;
    var screenHeight = this._display.getOptions().height;
    for (var x = 0; x < screenWidth; x++) {
        for (var y = 0; y < screenHeight; y++) {
            var glyph = this._map.getTile(x, y).getGlyph();
            this._display.draw(
                x,
                y,
                glyph.getChar(),
                glyph.getForeground(),
                glyph.getBackground());
        }
    }
    for (var i = 0; i < this._entities.length ; i++)
    {
        this._display.draw(
        this._entities[i].getLocX(),
        this._entities[i].getLocY(),
        this._entities[i].getGlyph().getChar(),
        this._entities[i].getGlyph().getForeground(),
        this._entities[i].getGlyph().getBackground());
    }
    if (game._current_room._id == 3)
    {
        this._display.draw(
    playerX,
    playerY,
    '@',
    '#999999',
    'black');
    }
    else
    {
        this._display.draw(
            playerX,
            playerY,
            '@',
            'black',
            'white');
    }
}
Room.prototype.handleInput = function (inputType, inputData) {
    if (inputType === 'keydown') {
        if (inputData.keyCode === ROT.VK_RETURN || inputData.keyCode === 49 ||inputData.keyCode === 50 || inputData.keyCode === 51 ||inputData.keyCode === 52 || inputData.keyCode === 53) {
            for (var d = 0; d < 8; d++) {
                for (var e = 0; e < this._entities.length; e++) {
                    if (this._entities[e].getLocX() == playerX + dx8[d] &&
                        this._entities[e].getLocY() == playerY + dy8[d]) {
                        this._entities[e].interact();
                    }
                }
            }
            for (var e2 = 0; e2 < this._entities.length; e2++) {
                if (this._entities[e2].getLocX() == playerX && this._entities[e2].getLocY() == playerY)
                    this._entities[e2].interact();
            }
        } else if (inputData.keyCode === ROT.VK_ESCAPE) {
        }
        if (inputData.keyCode === ROT.VK_LEFT) {
            this.move(-1, 0);
        } else if (inputData.keyCode === ROT.VK_RIGHT) {
            this.move(1, 0);
        } else if (inputData.keyCode === ROT.VK_UP) {
            this.move(0, -1);
        } else if (inputData.keyCode === ROT.VK_DOWN) {
            this.move(0, 1);
        }

    }
    $("#current_score").html(score);
}

Room.prototype.move = function (dX, dY) {
    var newposX = playerX + dX;
    var newposY = playerY + dY;

    if (this._map.getTile(newposX, newposY)._passable) {
        for (var e = 0; e < this._entities.length; e++) {
            if (this._entities[e].getLocX() == playerX + dX &&
                this._entities[e].getLocY() == playerY + dY) {
                if (this._entities[e].blockPath() || null)
                    return false;
            }
        }
        playerX += dX;
        playerY += dY;


        //update everything
        for (var e = 0; e < this._entities.length; e++) {
            this._entities[e].update();
            if (this._entities[e].locX == playerX &&
                this._entities[e].locY == playerY)
                this._entities[e].stepOn();
        }
    }
}

var Game = {
    _rooms: [],
    _current_room: null,
    init: function () {
        start = true;
        game = this;
        this._rooms.push(new Room(0));
        this._rooms.push(new Room(1));
        this._rooms.push(new Room(2));
        this._rooms.push(new Room(3));
        this._rooms.push(new Room(4));
        this._rooms.push(new Room(5));
        this._rooms.push(new Room(6));
        this._rooms.push(new Room(7));
        this._rooms.push(new Room(8));
        var bindEventToScreen = function (event) {
            window.addEventListener(event, function (e) {
                if (game._current_room !== null) {
                    game._current_room.handleInput(event, e);
                    game._current_room._display.clear();
                    game._current_room.render();
                }
            });
        }
        bindEventToScreen('keydown');


        transition('room0', 3, 0);
        this._current_room.enter(6, 6);
        $("#header").show("slow");
    }
}


window.onload = function () {
    start = false;

    if (!ROT.isSupported()) {
        alert("Please use Chrome");
    } else {
        current_page = "intro";
        transition("intro", 0);
    }
}

function transition(panel_name, dir, room_id) {
    if (room_id != null) {
        game._current_room = game._rooms[room_id];
        game._current_room._display.clear();
        game._current_room.render();
    }

    var $target = $("#" + panel_name),
        $other = $target.siblings('.active');

    if (!$target.hasClass('active')) {
        if (dir == 0) {
            $other.each(function (index, self) {
                var $this = $(this);
                $this.removeClass('active');
                $this.transition({
                    top: -$this.height()
                }, 500, function () { $(this).hide() });
            });

            $target.addClass('active').show().css({
                left: 0,
                top: ($target.height())
            }).transition({
                top: 0
            }, 500);
        }
        if (dir == 1) {
            $other.each(function (index, self) {
                var $this = $(this);
                $this.removeClass('active');
                $this.transition({
                    left: $this.width()
                }, 500, function () { $(this).hide() });
            });

            $target.addClass('active').show().css({
                top: 0,
                left: -($target.width())
            }).transition({
                left: 0
            }, 500);
        }
        if (dir == 2) {
            $other.each(function (index, self) {
                var $this = $(this);
                $this.removeClass('active');
                $this.transition({
                    top: $this.height()
                }, 500, function () { $(this).hide() });
            });

            $target.addClass('active').show().css({
                left: 0,
                top: -($target.height())
            }).transition({
                top: 0
            }, 500);
        }
        if (dir == 3) {
            $other.each(function (index, self) {
                var $this = $(this);
                $this.removeClass('active');
                $this.transition({
                    left: -$this.width()
                }, 500, function () { $(this).hide() });
            });

            $target.addClass('active').show().css({
                top: 0,
                left: ($target.width())
            }).transition({
                left: 0
            }, 500);
        }
    }
    else {

    }
}

function current_info()
{
    return $("#room" + game._current_room._id +"_info");
}

$(document).keydown(function (event) {
    var key = event.which;
    if (key == 13) {
        Game.init();
        $(document).off();
    }
});

window.addEventListener("keydown", function (e)
{
    // Disable arrow keys
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1)
    {
        e.preventDefault();
    }
}, false);