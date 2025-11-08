// api.js — Integración exclusiva con Pokemon TCG
// Envuelve el código en DOMContentLoaded para asegurar que los elementos existan
document.addEventListener('DOMContentLoaded', () => {
    const nombreCartaInput = document.getElementById('nombreCarta');
    const searchCardBtn = document.getElementById('searchCardBtn');
    const tcgResult = document.getElementById('tcgResult');

    // Pegar aquí tu API key de Pokemon TCG
    const TCG_API_KEY = '7d467a8c-f680-4544-a09e-d317ec3f5f5b';

    // Configurar SDK si está presente
    if (window && window.PokemonTCG) {
        if (TCG_API_KEY) {
            try { window.PokemonTCG.configure({ apiKey: TCG_API_KEY }); } catch (e) { console.warn('Error configurando PokemonTCG SDK:', e); }
        }
    } else {
        console.warn('PokemonTCG SDK no encontrada. Se usará fetch directo como fallback.');
    }

    async function buscarCartaTCG() {
        const nombre = (nombreCartaInput && nombreCartaInput.value || '').trim();
        if (!nombre) {
            if (tcgResult) tcgResult.innerHTML = '<div style="color:#ffdcdc">Ingresa un nombre de carta para buscar.</div>';
            return;
        }

        if (tcgResult) tcgResult.innerHTML = '<div style="color:#fff">Buscando carta...</div>';

        try {
            let cards = null;

            if (window && window.PokemonTCG && window.PokemonTCG.card) {
                const q = `name:${nombre}`;
                const res = await window.PokemonTCG.card.where({ q });
                cards = res && (res.data || res);
            } else {
                const query = `q=name:${encodeURIComponent('"' + nombre + '"')}`;
                const url = `https://api.pokemontcg.io/v2/cards?${query}`;
                const headers = {};
                if (TCG_API_KEY) headers['X-Api-Key'] = TCG_API_KEY;
                const r = await fetch(url, { headers });
                if (!r.ok) throw new Error('Error al consultar la API TCG');
                const json = await r.json();
                cards = json && json.data;
            }

            if (!cards || !cards.length) {
                if (tcgResult) tcgResult.innerHTML = '<div style="color:#ffdcdc">No se encontraron cartas.</div>';
                return;
            }

            const c = cards[0];
            const img = (c.images && (c.images.small || c.images.large)) || c.smallImage || c.imageUrl || '';
            const nombreCarta = c.name || c.title || 'Carta';

            if (tcgResult) {
                tcgResult.innerHTML = `
                    <div class="tcg-card">
                        <div class="tcg-card-inner">
                            ${img ? `<img src="${img}" alt="${nombreCarta}">` : ''}
                            <div style="color:#fff; font-weight:700">${nombreCarta}</div>
                            ${c.set ? `<div style="color:#ddd; font-size:0.9rem">Set: ${c.set.name || c.set}</div>` : ''}
                        </div>
                    </div>
                `;

                // Añadir listeners para el efecto 3D
                const tcgCardEl = tcgResult.querySelector('.tcg-card');
                if (tcgCardEl) {
                    const onMove = (e) => {
                        const rect = tcgCardEl.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        const cx = rect.width / 2;
                        const cy = rect.height / 2;
                        const rotX = ((y - cy) / cy) * -12; // ajustar intensidad
                        const rotY = ((x - cx) / cx) * 12;
                        // aumentar el zoom a 1.12 para un efecto más pronunciado
                        tcgCardEl.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.12,1.12,1.12)`;
                        tcgCardEl.style.boxShadow = `${-rotY}px ${Math.abs(rotX)*3 + 12}px 40px rgba(0,0,0,0.42)`;
                    };

                    const onLeave = () => {
                        tcgCardEl.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
                        tcgCardEl.style.boxShadow = '0 8px 20px rgba(0,0,0,0.25)';
                    };

                    tcgCardEl.addEventListener('mousemove', onMove);
                    tcgCardEl.addEventListener('mouseleave', onLeave);
                    // también soportar touch: restablecer al tocar fuera
                    tcgCardEl.addEventListener('touchstart', (ev) => { ev.preventDefault(); });
                }
            }
        } catch (err) {
            console.error(err);
            if (tcgResult) tcgResult.innerHTML = `<div style="color:#ffdcdc">Error buscando carta: ${err.message}</div>`;
        }
    }

    if (searchCardBtn) searchCardBtn.addEventListener('click', buscarCartaTCG);
    if (nombreCartaInput) nombreCartaInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') buscarCartaTCG(); });
    
    /* ------------------ PokéAPI: buscar y renderizar Pokémon ------------------ */
    const searchPokemonInput = document.getElementById('searchPokemonInput');
    const searchPokemonBtn = document.getElementById('searchPokemonBtn');
    const pokeResult = document.getElementById('pokeResult');

    async function buscarPokemon() {
        const q = (searchPokemonInput && searchPokemonInput.value || '').trim().toLowerCase();
        if (!q) { if (pokeResult) pokeResult.innerHTML = '<div style="color:#ffdcdc">Ingresa nombre o ID de Pokémon</div>'; return; }

        if (pokeResult) pokeResult.innerHTML = '<div style="color:#fff">Buscando Pokémon...</div>';

        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(q)}`);
            if (!res.ok) throw new Error('Pokémon no encontrado');
            const data = await res.json();

            const img = data.sprites.other['official-artwork'].front_default || data.sprites.front_default || '';
            const name = data.name;
            const id = String(data.id).padStart(3,'0');
            const types = data.types.map(t => t.type.name).join(' • ');

            if (pokeResult) {
                pokeResult.innerHTML = `
                    <div class="tcg-card poke-card">
                        <div class="tcg-card-inner">
                            ${img ? `<img src="${img}" alt="${name}">` : ''}
                            <div style="color:#fff; font-weight:700; text-transform:capitalize">${name} <span style="opacity:.8">#${id}</span></div>
                            <div style="color:#ddd; font-size:0.9rem">${types}</div>
                        </div>
                    </div>
                `;

                // Reuse same 3D listeners as TCG card
                const pokeCardEl = pokeResult.querySelector('.tcg-card');
                if (pokeCardEl) {
                    const onMove = (e) => {
                        const rect = pokeCardEl.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        const cx = rect.width / 2;
                        const cy = rect.height / 2;
                        const rotX = ((y - cy) / cy) * -12;
                        const rotY = ((x - cx) / cx) * 12;
                        pokeCardEl.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.12,1.12,1.12)`;
                        pokeCardEl.style.boxShadow = `${-rotY}px ${Math.abs(rotX)*3 + 12}px 40px rgba(0,0,0,0.42)`;
                    };
                    const onLeave = () => { pokeCardEl.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'; pokeCardEl.style.boxShadow = '0 8px 20px rgba(0,0,0,0.25)'; };
                    pokeCardEl.addEventListener('mousemove', onMove);
                    pokeCardEl.addEventListener('mouseleave', onLeave);
                }
            }
        } catch (err) {
            console.error(err);
            if (pokeResult) pokeResult.innerHTML = `<div style="color:#ffdcdc">${err.message}</div>`;
        }
    }

    if (searchPokemonBtn) searchPokemonBtn.addEventListener('click', buscarPokemon);
    if (searchPokemonInput) searchPokemonInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') buscarPokemon(); });
});

