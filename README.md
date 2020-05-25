# LRP netGra v1.0

The very first version of a graph viewer.

Displays a simple network graph using D3JS library.

The input graph file has to be formated properly.

    {
        "nodes": [
            {"id": 0, "name": "node a"},
            {"id": 1, "name": "node b"},
            {"id": 2, "name": "node c"}
        ];
        "links": [
            {"source": 0, "target": 2}
            {"source": 2, "target": 3}
        ]
    }

# Running it

I am assuming you have NodeJS and Electron installed on your computer.

Clone the repo, `cd` to it, then `npm start`

That's it.

Looks like this.

![LRP netGra preview](preview.png)