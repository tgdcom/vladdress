#!/usr/bin/env node
import { parseAddress } from './parse-address';

const address = process.argv.slice(2).join(' ').trim();

if (!address) {
    console.error('Usage: vladdress <address>');
    console.error('  Example: vladdress "123 Main St, Springfield, IL 62701"');
    process.exit(1);
}

try {
    const result = parseAddress(address);
    console.log(JSON.stringify(result, null, 2));
} catch (err) {
    console.error('Error:', (err as Error).message);
    process.exit(1);
}
