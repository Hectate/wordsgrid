// MIT license 2026 - Nathaniel "Hectate" Mitchell

import fs from "node:fs";
import { all } from "@wordlist/english-eff/all";
import { RandomWords } from "@wordlist/random";
import {
    intro,
    outro,
    note,
    text,
    confirm,
    log,
    box,
    selectKey,
} from "@clack/prompts";
import { table } from "table";
import { EOL } from "node:os";

intro(
    `This is a generator that creates a grid of words or hexidecimal values in a monospaced text file.`
);

const titleText = await text({
    message: `What title should this grid have? (default: blank)`,
});

const wordOption = await selectKey({
    message: `Do you want words or hexidecimal values?`,
    defaultValue: "w",
    options: [
        { value: "w", label: "Words" },
        { value: "h", label: "Hexidecimal" },
    ],
    caseSensitive: false,
});

const colSizeValue = Number(
    await text({
        message: `How many Columns of words do you want? (default: 10)`,
        defaultValue: "10",
        validate(value) {
            if (!value) return undefined;
            const num = parseInt(value);
            if (isNaN(num))
                return "Please provide a whole number higher than 0.";
            if (num <= 0) return `Please use a whole number higher than 0.`;
        },
    })
);

const rowSizeValue = Number(
    await text({
        message: `How many Rows of words do you want? (default: 20)`,
        defaultValue: "20",
        validate(value) {
            if (!value) return undefined;
            const num = parseInt(value);
            if (isNaN(num))
                return "Please provide a whole number higher than 0.";
            if (num <= 0) return `Please use a whole number higher than 0.`;
        },
    })
);

const displayOutput = await confirm({
    message: `Do you want to view the items chosen?`,
});

function randomHexString(length) {
    let result = "";
    for (let i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 16).toString(16);
    }
    return result.toUpperCase();
}
let arr = [];
if (wordOption === "h") {
    const hexSize = Number(
        await text({
            message: `How many digits for your hexidecimal values?`,
            defaultValue: "3",
            placeholder: "3",
            validate(value) {
                if (!value) return undefined;
                const num = parseInt(value);
                if (isNaN(num))
                    return "Please provide a whole number higher than 0.";
                if (num <= 0) return `Please use a whole number higher than 0.`;
            },
        })
    );
    for (let i = 0; i < colSizeValue * rowSizeValue; i++) {
        arr.push(randomHexString(hexSize));
    }
} else {
    const random = new RandomWords(all);
    arr = await random.generate(colSizeValue * rowSizeValue);
}

log.success(`Generated ${arr.length} total items.`);

if (displayOutput) {
    for (let i = 0; i < rowSizeValue; i++) {
        note(arr.slice(i * colSizeValue, (i + 1) * colSizeValue));
    }
}

const fileName = await text({
    message: `What would you like the file to be saved as? (default: output.txt)`,
    placeholder: `output.txt`,
    defaultValue: `output.txt`,
    validate(value) {
        if (value && value.length <= 0)
            return `Please supply a name longer than 0 characters`;
    },
});

const aleph = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const data = [];
const columnSize = colSizeValue + 1;
data[0] = [""];
const rowSize = rowSizeValue + 1;
for (let i = 0; i < columnSize - 1; i++) {
    const multiple = Math.floor(i / aleph.length);
    const remainder = i % aleph.length;
    const char = aleph[remainder];
    let header = char;
    for (let ii = 0; ii < multiple; ii++) {
        header += char;
    }
    data[0].push(header);
}
for (let i = 0; i < rowSize - 1; i++) {
    data.push([i, ...arr.slice(i * colSizeValue, (i + 1) * colSizeValue)]);
}

const config = {};

log.info(`Writing file to current path: ${fileName}`);

let content = titleText ? titleText + EOL : "";
content += table(data, config);
fs.writeFileSync(fileName, content, (err) => {
    if (err) {
        log.error(err);
    }
});

outro(`Complete, exiting program.`);
