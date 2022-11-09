//using strict mode
"use strict";
// fetching rod-1
var rod1 = document.getElementById("rod1");
// fetching rod-2
var rod2 = document.getElementById("rod2");
// fetching ball
var ball = document.getElementById("ball");
var current_timeout_is_running = false;
var current_score =
{
    first: 0,
    second: 0,
}
var action =
{
    loosing_side: "",
    lost: false
}
function centerTheElement(element)
{
    element.style.left = ((document.documentElement.clientWidth / 2) - (element.offsetWidth / 2)).toString() + "px";
    element.style.left = ((document.documentElement.clientWidth / 2) - (element.offsetWidth / 2)).toString() + "px";
    if (element == ball)
    {
        if (action.lost)
        {
            if (action.loosing_side == "first")
            {
                ball.style.top = (rod1.clientHeight+5).toString() + "px";
            }
            else
            {
                ball.style.top = (document.documentElement.clientHeight - rod2.clientHeight - ball.clientHeight-5).toString() + "px";
            }
        }
        else
            element.style.top = (document.documentElement.clientHeight / 2).toString() + "px";
    }
}

function add_event_listener_to_rods()
{
    window.addEventListener("keydown", function (event)
    {
        let code = event.keyCode;
        if (code == 39)
        {

            let left_numeric = parseInt(
                rod1.style.left.substring(0, rod1.style.left.length - 2)
            );
            left_numeric += 20;
            if (left_numeric + rod1.offsetWidth > document.documentElement.clientWidth)
            {
                left_numeric = document.documentElement.clientWidth - rod1.offsetWidth;
            }
            rod1.style.left = left_numeric.toString() + "px";
            rod2.style.left = left_numeric.toString() + "px";
        } 
        else if (code == 37)
        {
            let left_numeric = parseInt(
                rod1.style.left.substring(0, rod1.style.left.length - 2)
            );
            left_numeric -= 20;
            if (left_numeric < 0)
            {
                left_numeric = 0;
            }
            rod1.style.left = left_numeric.toString() + "px";
            rod2.style.left = left_numeric.toString() + "px";
        }
    });
}

function touchTheTop()
{
    let ball_top_numerical = ball.getBoundingClientRect().top;
    let ball_left_numerical = ball.getBoundingClientRect().left;
    let bar_left_numerical = parseInt(rod1.style.left.substring(0, rod1.style.left.length - 2));
    if ((ball_top_numerical <= rod1.clientHeight) && (ball_left_numerical + (ball.clientWidth / 2) > bar_left_numerical) && (ball_left_numerical + (ball.clientWidth / 2) < bar_left_numerical + rod1.clientWidth))
    {
        if (!current_timeout_is_running)
        {
            current_timeout_is_running = true;
            setTimeout(function ()
            {
                current_score.first++;
                current_timeout_is_running = false;
                console.log("first", current_score.first);
            }, 200);
        }
        return true;
    }
    return false;
}
function touched_lower_bar()
{
    let ball_top_numerical = ball.getBoundingClientRect().top;
    let ball_left_numerical = ball.getBoundingClientRect().left;
    let bar_left_numerical = parseInt(rod2.style.left.substring(0, rod2.style.left.length - 2));
    if ((ball_top_numerical + ball.clientHeight + rod2.clientHeight >= document.documentElement.clientHeight) && (ball_left_numerical + (ball.clientWidth / 2) > bar_left_numerical) && (ball_left_numerical + (ball.clientWidth / 2) < bar_left_numerical + rod2.clientWidth))
    {
        if (!current_timeout_is_running)
        {
            current_timeout_is_running = true;
            setTimeout(function ()
            {
                current_score.second++;
                current_timeout_is_running = false;
                console.log("second", current_score.second);
            }, 200);
        }
        return true;
    }
    return false;
}
function set_interval_for_ball()
{

    let interval_id = setInterval(function ()
    {
        let numeric_left = ball.getBoundingClientRect().left;
        let numeric_top = ball.getBoundingClientRect().top;
        // if hit left
        if (numeric_left <= 0)
        {
            let class_present = ball.classList[0];
            if (class_present == "animate-top-left")
            {
                ball.classList.remove(class_present);
                ball.classList.add("animate-top-right");
            }
            else if (class_present == "animate-bottom-left")
            {
                ball.classList.remove(class_present);
                ball.classList.add("animate-bottom-right");
            }
        }
        // if hit right
        else if (numeric_left + ball.offsetWidth >= document.documentElement.clientWidth)
        {
            let class_present = ball.classList[0];
            if (class_present == "animate-top-right")
            {
                ball.classList.remove(class_present);
                ball.classList.add("animate-top-left");
            }
            else if (class_present == "animate-bottom-right")
            {
                ball.classList.remove(class_present);
                ball.classList.add("animate-bottom-left");
            }
        }
        // if the game is over
        else if (numeric_top <= 0 || numeric_top + ball.offsetHeight >= document.documentElement.clientHeight)
        {
            ball.classList.remove(ball.classList[0])
            if (numeric_top <= 0)
            {
                action.loosing_side = "first";
                action.lost = true;
            }
            else if (numeric_top + ball.offsetHeight >= document.documentElement.clientHeight)
            {
                action.loosing_side = "second";
                action.lost = true;
            }
            centerTheElement(ball);
            centerTheElement(rod1);
            centerTheElement(rod2);

            alert('Game Over!!!');
            clearInterval(interval_id);
            if (current_score.first > localStorage.getItem('first'))
            {
                localStorage.setItem('first', current_score.first);
            }
            if (current_score.second > localStorage.getItem('second'))
            {
                localStorage.setItem('second', current_score.second);
            }
            current_score.first=0;
            current_score.second=0;
            show_score();
        }
        else if (touched_lower_bar())//if lower bar is touched
        {
            let class_present = ball.classList[0];
            if (class_present == "animate-bottom-right")
            {
                ball.classList.remove(class_present);
                ball.classList.add("animate-top-right");
            }
            else if (class_present == "animate-bottom-left")
            {
                ball.classList.remove(class_present);
                ball.classList.add("animate-top-left");
            }
        }
        else if (touchTheTop())//if upper bar is touched
        {
            let class_present = ball.classList[0];
            if (class_present == "animate-top-right")
            {
                ball.classList.remove(class_present);
                ball.classList.add("animate-bottom-right");
            }
            else if (class_present == "animate-top-left")
            {
                ball.classList.remove(class_present);
                ball.classList.add("animate-bottom-left");
            }
        }
    }, 1)
}
function show_score()
{
    if (localStorage.getItem('first') == null)
    {
        localStorage.setItem('first', 0);
        localStorage.setItem('second', 0);
        window.alert("This is your first time");
    }
    else
    {
        window.alert("The maximum score of Rod-1 is: " + localStorage.getItem('first').toString() + "\n" + "The maximum score of Rod-2 is: " + localStorage.getItem('second'));
    }
}

centerTheElement(rod1);
centerTheElement(rod2);
centerTheElement(ball);
show_score();
add_event_listener_to_rods();
set_interval_for_ball();

document.addEventListener('keydown', function (event)
{
    if (event.keyCode == 13)
    {
        if (action.lost)
        {
            if (action.loosing_side == "first")
            {
                ball.classList.add('animate-bottom-right');
            }
            else
            {
                ball.classList.add('animate-top-right');
            }
        }
        else
            ball.classList.add('animate-bottom-right');
        set_interval_for_ball()
    }
})