// Will watch for turns and stuff
var robot = require ( "robotjs" );

const manaLocations = [
    {
        x: 1642,
        y: 652
    },
    {
        x: 1662,
        y: 655
    },
    {
        x: 1678,
        y: 649
    },
    {
        x: 1697,
        y: 646
    },
    {
        x: 1711,
        y: 637
    },
    {
        x: 1724,
        y: 625
    },
    {
        x: 1736,
        y: 611
    },
    {
        x: 1749,
        y: 599
    },
    {
        x: 1754,
        y: 583
    },
    {
        x: 1764,
        y: 568
    }
];

const spellManaLocations = [
    {
        x: 1681,
        y: 686
    },
    {
        x: 1702,
        y: 679
    },
    {
        x: 1723,
        y: 669
    }
]

function getTurn ( )
{
    var turnLocation = {
        x: 1666,
        y: 493
    }
    var s1 = "2745d7";
    var s2 = robot.getPixelColor ( turnLocation.x, turnLocation.y );
    if ( getStringDiff ( s1, s2 ) < 4 )
    {
        return true;
    }
    else
    {
        return false;
    }
}

function getAttackToken ( )
{
    var hex = robot.getPixelColor(1596, 775);
    if ( hex == "fddd1d" )
    {
        return true;
    }
    return false;
}

function getSpellMana ( )
{
    var s1 = "3affff";
    var s2 = "";
    var mana = 0;
    for ( location of spellManaLocations )
    {
        s2 = robot.getPixelColor ( location.x, location.y );
        if ( getStringDiff ( s1, s2 ) < 4 )
        {
            mana += 1;
        }
        else
        {
            break;
        }
    }
    console.log ( `You have ${mana} spell mana` );
    return mana;
}

function getMana ( )
{
    var s1 = "4d7eff";
    var s2 = "";
    var mana = 0;
    for ( location of manaLocations )
    {
        s2 = robot.getPixelColor ( location.x, location.y );
        if ( getStringDiff ( s1, s2 ) < 4 )
        {
            mana += 1;
        }
        else
        {
            break;
        }
    }
    console.log ( `You have ${mana} mana` );
    return mana;
}

function getStringDiff (a, b){
    if(a.length == 0) return b.length; 
    if(b.length == 0) return a.length; 
  
    var matrix = [];
  
    // increment along the first column of each row
    var i;
    for(i = 0; i <= b.length; i++){
      matrix[i] = [i];
    }
  
    // increment each column in the first row
    var j;
    for(j = 0; j <= a.length; j++){
      matrix[0][j] = j;
    }
  
    // Fill in the rest of the matrix
    for(i = 1; i <= b.length; i++){
      for(j = 1; j <= a.length; j++){
        if(b.charAt(i-1) == a.charAt(j-1)){
          matrix[i][j] = matrix[i-1][j-1];
        } else {
          matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                  Math.min(matrix[i][j-1] + 1, // insertion
                                           matrix[i-1][j] + 1)); // deletion
        }
      }
    }
  
    return matrix[b.length][a.length];
};

function runWatcher ( )
{
    // just loop forever... watching... for eternity...
    setTimeout ( runWatcher, 200 );
}

function getMouseColor ( )
{
    var mouse = robot.getMousePos ( );
    console.log ( robot.getPixelColor ( mouse.x, mouse.y ) );
}

getMouseColor ( );