const fs = require('fs');
const path = require('path');

// clear && node ./src/convert.js ./ipynb/ index,001_Legal,002_Parcels,003_Lore,004_Tutorials,005_Monetize,006_Websites ./src/posts/

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const marked = require('marked');

function cv_cli_nbs2html() {        
    const args = process.argv.slice(2);
    ///console.log('cv_cli_nbs2html', args); 
    const pathto = args[0];
    const pages = args[1].split(',');
    const saveto = args[2];
    
    const pagePaths = pages.map(page => pathto + page);
    generate_sitemap(pagePaths, saveto);
}

cv_cli_nbs2html();

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

async function generate_sitemap(pages, saveto = "../src/posts/") {
    /* 
    0. Publish a set of pages and create a table of contents json file for em.
    Checks or creates sitemap.json and uses it to generate and update pages from the cmd line.
    */
    ///console.log('\n generate_sitemap', pages, saveto, '\n\n');
    let links = [];
    /*
    try {
        const sitemapPath = path.join(saveto, "sitemap.json");
        const sitemapJson = await fs.promises.readFile(sitemapPath, "utf8");
        const sitemapArray = JSON.parse(sitemapJson);
        pages = Array.from(new Set(pages.concat(sitemapArray.map(obj => obj.filename)
            .filter(filename => !pages.some(val => filename.includes(val))))));
    } catch (e) { }
    */

    for (const page of pages) {
        const r = await ipynb_publish(page, saveto);
        if (r.meta.hide === 'false') {
            const { badges, keywords, comments, hide, image, toc, title, ...rest } = r.meta;
            links.push(rest);
        }
    }
    try {
        const sitemapPath = path.join(saveto, "sitemap.json");
        await fs.promises.writeFile(sitemapPath, JSON.stringify(links));
    } 
    catch (e) {
        const sitemapPath = path.join(saveto, "sitemap.json");
        await fs.promises.writeFile(sitemapPath, "{}"); 
    }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

async function ipynb_publish(file = 'index', saveto = "../src/posts/", type = 'json') { 
    /*
    1. Publish ipynb to json or html.
    */
   ///console.log(('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
   ///console.log(('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~', '\n\n');
   ///console.log(('START:', {saveto, file, type}, '\n');
    let final;
    if (type === 'html') { raw = await nb2html(file); file=/[^/]*$/.exec(file); } 
    else if (type === 'json') {
        final = await nb2json(file);
        let { filename, ...meta } = final.meta;
        filename = filename.toLowerCase().replace(' ', '_');
        final.meta = { filename, ...meta };
        file = filename
    }
   ///console.log(('Saving ', final, '\n\n');
   ///console.log(('As: ', file, '\n')
   ///console.log(('To ', saveto, '\n\n');
    const t = path.join(saveto, `${file}.${type}`);
    await fs.promises.writeFile(t, type === 'json' ? JSON.stringify(final) : final);
    return final;
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

async function nb2json(fname) {
    /* 
        1a. Must be in directory of ipynb you want to convert to html.
    */
    ///console.log('nb2json', fname, '\n');
    const nbPath = `${fname}.ipynb`;
    const nbJson = await fs.promises.readFile(nbPath, 'utf8');
    const nb = JSON.parse(nbJson);
    const meta = get_metadata(nb.cells[0]);
    ///console.log('- get_metadata', meta, '\n');
    const content = convertNb(nb.cells.slice(1)).join(''); 
    const resp = replaceEmojis(content);
    ///console.log('- - replaceEmojis Ran', '\n');
    return { meta, content: resp };
}

async function nb2html(fname) {
    ///console.log('nb2html', fname);
    return (await nb2json(fname)).content;
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function get_metadata(data) {
    /*
        2. Get markdown (title, summary) and yaml from 1st cell in ipynb.
    */
    const y = {};
    for (const x of data.source) {
        if (x.startsWith('#')) {
            y.title = x.replace('\n', '').replace('# ', '', 2);
        } 
        else if (x.startsWith('>')) {
            y.summary = x.replace('\n', '').replace('> ', '', 1);
        } 
        else if (x.startsWith('-')) {
            const key = x.slice(x.indexOf('- ') + 2, x.indexOf(': '));
            const val = x.slice(x.indexOf(': ') + 2).replace('\n', '');
            y[key] = val;
        }
    }
    return y;
}

function convertNb(cells) {
    ///console.log('- convertNb Running');
    /*
        3. passes each cell to decision fn.
    */
    return cells.map(c => cleanCell(c));
}

function replaceEmojis(text) {
    ///console.log('- replaceEmojis Running');
    /* 
        8. Convert emojis to html entities
    */
    text = text.replace('🙂', '&#1F642');
    text = text.replace('😳', '&#128563');
    text = text.replace('\u2003', '&#8195');
    text = text.replace('👷', '&#128119');
    text = text.replace('🧡', '&#129505');
    text = text.replace('💖', '&#128150');
    // Dec => Code => https://apps.timwhitlock.info/unicode/inspect/hex/1F633
    return text;
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function cleanCell(cell) {
    ///console.log('- - cleanCell Running');//, cell ,'\n');
    /*
        4. returns text or passes cell to 'code cell' processor
    */
    let x
    if (cell['cell_type'] == 'markdown') {
        ///console.log('- - - Parsing Markdown');
        x = marked.parse(cell['source'].join(' ')); //marko.convert
    } else {
        x = processCode(cell);
    }
    ///console.log('- - cleanCell Ran: \n\n ', x, '\n\n');
    return x
}

function processCode(cell) {
    ///console.log('- - - processCode Running');
    /*
        5. Calls getFlags, processSource, processOutput 
    */
    let x = [];
    let flags = [];
    // source
    if (cell['source'].length) {
        // ///console.log('- - - - Raw Input Source', cell['source'])
        let source = cell['source'];
        flags = getFlags(source[0]);
        ///console.log('- - - - - Flags: ', flags);

        source = processSource(source.slice(1).join(' '), flags);
        ///console.log('- - - - - processSource: ', source);

        x.push(source);
    }
    // output
    if (cell['outputs'].length) {
        // ///console.log('- - - - Raw Process Outputs', cell['outputs'])
        for (let o of cell['outputs']) {
            x.push(processOutput(o, flags));
        }
        ///console.log('- - - - - processOutput: ', x);
        // ///console.log('Processed Output');
        // clear_output();
    }
    ///console.log('- - - processCode Ran'); 
    return x;
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function getFlags(source) {
    /*
        6a. Detect and stripout and handle flags.
    */
    const input_aug = [
        '#collapse_input_open',
        '#collapse_input',
        '#collapse_output_open',
        '#collapse_output',
        '#hide_input',
        '#hide_output',
        '#hide ',
        '%%capture',
        '%%javascript',
        '%%html'
    ];
    return input_aug.filter(x => new RegExp(x).test(source));

}

function processSource(source, flags) { 
    /*
        6b. Strip Flags from text, make details, hide all.
    */
    // ///console.log('processSource... ', source);
    for (let lbl of flags) {
      // ///console.log('processSource... ', lbl);
        source = source.replace(lbl + '\r\n', '');
        source = source.replace(lbl + '\n', ''); // Strip the Flag
        if (lbl == '#collapse_input_open') source = makeDetails(source, true);
        if (lbl == '#collapse_input') source = makeDetails(source, false);
        if (lbl == '#hide ') source = '';
        if (lbl == '#hide_input') source = '';
        if (lbl == '%%javascript') source = '';
        if (lbl == '%%html') source = '';
        if (lbl == '%%capture') source = '';
    }
    return source;
}

function processOutput(source, flags) { 
    /*
        6c. Strip Flags from output, make details, hide all.
    */
    if (source['output_type'] == 'error') { return ''; }
    if (source['output_type'] == 'stream') { 
        if (source['name'] == 'stderr') {return '';}
        source['data'] = {'text/html': source['text']}; // This will have the stream process as text/html.
    }

    const keys = Object.keys(source['data']);
    if (keys.includes('text/html')) { source = source['data']['text/html']; source = source.join(''); } 
    else if (keys.includes('application/javascript')) { 
        source = '<script>' + source['data']['application/javascript'] + '</script>'; } 
    else if (keys.includes('image/png')) { source = "<img src=\"data:image/png;base64," + source['data']['image/png'] + "\" alt='Image Alt Text'>"; } 
    else if (keys.includes('text/plain')) { source = !(/<Figure/.test(source['data']['text/plain'])) ?  source['data']['text/plain'] : '' }

    for (let lbl of flags) {
        source = source.replace(lbl + '\r\n', '');
        source = source.replace(lbl + '\n', '');
        if (lbl == '#collapse_output_open') { source = makeDetails(source, true); }
        if (lbl == '#collapse_output') { source = makeDetails(source, false); }
        if (lbl == '#hide_output') { source = ''; }
        if (lbl == '#hide ') { source = ''; }
    }

    return source;
    //output_type == 'stream' ==> text
    //output_type == 'display_data' ==> data{'application/javascript' or 'text/html' or 'execute_result'}
}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function makeDetails(content, open) {
    /*
        7. Called by processOutput and processSource.
    */
    return "<details " + (open ? 'open' : '') + "> <summary>Click to toggle</summary> " + content + "</details>";
}

