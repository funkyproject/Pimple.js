Pimple.js ( inspired by https://github.com/fabpot/Pimple )
======

Dependency :: 
	http://code.google.com/p/javascript-classes 


Pimple.js is a small Dependency Injection Container for Javascript that consists
of just one file and one class (about 50 lines of code).

`Download it`_, require it in your code, and you're good to go::

    <script type="text/javascript" src="path/to/pimple.js"></script>

Creating a container is a matter of instating the ``Pimple`` class::

    container = new Pimple();

As many other dependency injection containers, Pimple is able to manage two
different kind of data: *objects* and *parameters*.

Defining Parameters
-------------------

Defining a parameter is as simple as using the Pimple instance as an array::

    // define some parameters
    container.set('cookie_name, 'SESSION_ID');
    container.set('session_storage_class', 'SessionStorage');

Defining Objects
----------------

Objects are defined by anonymous functions that return an instance of the
object::

    // define some objects
    container.set('session_storage', function (c) {
        return new c.get('session_storage_class')(c.get('cookie_name'));
    });

    container.set('session',  function (c) {
        return new Session(c.get('session_storage'));
    });

Notice that the anonymous function has access to the current container
instance, allowing references to other objects or parameters.

As objects are only created when you get them, the order of the definitions
does not matter, and there is no performance penalty.

Using the defined objects is also very easy::

    // get the session object
    session = container.get('session');

    // the above call is roughly equivalent to the following code:
    // storage = new SessionStorage('SESSION_ID');
    // session = new Session(storage);

Defining Shared Objects
-----------------------

By default, each time you get an object, Pimple returns a new instance of it.
If you want the same instance to be returned for all calls, wrap your
anonymous function with the ``share()`` method::

    c.set('session',  c.share(function (c) {
        return new Session(c.get('session_storage'));
    }));

Protecting Parameters
---------------------

As Pimple makes no difference between a parameter and an object, you can use
the ``protect()`` method if you need to define a parameter as an anonymous
function::

    c.set('random',c.protect(function () { return rand(); }));


.. _Download it: https://github.com/funkyproject/Pimple
.. _Inspired by : https://github.com/fabpot/Pimple