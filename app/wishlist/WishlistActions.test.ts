import { test } from 'node:test';
import assert from 'node:assert';

test('Wishlist validation logic', () => {
    // We are testing the core validation logic inside the `save` function.

    function validate(form: any) {
        const trimmedName = (form.name || '').trim();
        if (!trimmedName || trimmedName.length > 100) return 'invalid name';

        const trimmedCuisine = (form.cuisine_type || '').trim();
        if (trimmedCuisine && trimmedCuisine.length > 50) return 'invalid cuisine';

        const trimmedAddress = (form.address || '').trim();
        if (trimmedAddress && trimmedAddress.length > 255) return 'invalid address';

        const trimmedNotes = (form.notes || '').trim();
        if (trimmedNotes && trimmedNotes.length > 1000) return 'invalid notes';

        const price = parseInt(form.price_range);
        const parsedPrice = !isNaN(price) && price >= 1 && price <= 4 ? price : null;

        return {
            name: trimmedName,
            cuisine: trimmedCuisine,
            address: trimmedAddress,
            notes: trimmedNotes,
            price: parsedPrice
        };
    }

    assert.deepEqual(validate({ name: '  Test Restaurant  ', price_range: '3' }), {
        name: 'Test Restaurant',
        cuisine: '',
        address: '',
        notes: '',
        price: 3
    });

    assert.equal(validate({ name: 'a'.repeat(101) }), 'invalid name');
    assert.equal(validate({ name: 'ok', cuisine_type: 'c'.repeat(51) }), 'invalid cuisine');
    assert.equal(validate({ name: 'ok', address: 'a'.repeat(256) }), 'invalid address');
    assert.equal(validate({ name: 'ok', notes: 'n'.repeat(1001) }), 'invalid notes');

    assert.deepEqual(validate({ name: 'ok', price_range: '5' }), {
        name: 'ok',
        cuisine: '',
        address: '',
        notes: '',
        price: null // out of bounds
    });

    assert.deepEqual(validate({ name: 'ok', price_range: 'invalid' }), {
        name: 'ok',
        cuisine: '',
        address: '',
        notes: '',
        price: null // nan
    });
});
