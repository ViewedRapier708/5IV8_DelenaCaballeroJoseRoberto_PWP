// api.js — Integración exclusiva con Pokemon TCG
// Envuelve el código en DOMContentLoaded para asegurar que los elementos existan
document.addEventListener('DOMContentLoaded', () => {
    const nombreCartaInput = document.getElementById('nombreCarta');

   
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
                //Es para poner la imagen de los pokémon
                pokeResult.innerHTML = `
                    <div class="tcg-card poke-card">
                        <div class="tcg-card-inner">
                            ${img ? `<img src="${img}" alt="${name}">` : ''}
                            <div style="color:#fff; font-weight:700; text-transform:capitalize">${name} <span style="opacity:.8">#${id}</span></div>
                            <div style="color:#ddd; font-size:0.9rem">${types}</div>
                        </div>
                    </div>
                `;

                //Es para el efecto xd 
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

