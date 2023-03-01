// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//
// Not to be used. But still.
//

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


function cv_cli_nb2py() {
    const [infile, outfile] = process.argv.slice(2);
    nb2py(infile, outfile);
}

function nb2py(infile, outfile) {
    /*
        1st fn. passes each cell to decision fn.
    */
    const links = [];
    const nb = JSON.parse(fs.readFileSync(infile, 'utf-8'));
    const nb2 = nb['cells'].map(filterCells).filter(Boolean);
    const outp = nb2.join('\n\n');
    fs.writeFileSync(outfile, outp);
}


function filterCells(cell) {
    /*
        2nd fn. returns text or passes cell to 'code cell' processor
    */
    return cell['cell_type'] == 'markdown' ? '' : getCode(cell);
}

function getCode(cell) {
    /*
        3rd fn. passes each cell to decision fn.
    */
    // console.log(cell['source'], '\n')
    const flags = ['#export '].filter(x => re.search(x, cell['source'][0]));
    let x = '';
    if (flags.length >= 1) { x = cell['source'].slice(1).join(''); }
    return x;
}

function bump_version(path) {
    const f = fs.readFileSync(path + '__init__.py', 'utf-8');
    const lines = f.split('\n');
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.startsWith('__version__')) {
            const version = line.match(/\d+\.\d+\.\d+/)[0].split('.');
            if (version[2] !== '99') {
                version[2] = String(parseInt(version[2]) + 1);
            } 
            else {
                version[2] = '0';
                if (version[1] !== '99') {
                    version[1] = String(parseInt(version[1]) + 1);
                } 
                else {
                    version[1] = '0';
                    version[0] = String(parseInt(version[0]) + 1);
                }
            }
            const newVersion = '__version__ = "' + version.join('.') + '"';
            fs.writeFileSync(path + '__init__.py', newVersion);
        }
    }
} 

function cv_cli_bump_version() {
    const path = process.argv[2];
    bump_version(path);
}