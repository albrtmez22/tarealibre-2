// Datos simulados para la aplicación
const MOCK_RECIPES = [
    {
        id: 1,
        title: "Pasta al Pesto con Pollo",
        image: "/api/placeholder/400/320",
        cuisine: "italian",
        prepTime: 25,
        difficulty: "easy",
        ingredients: ["pasta", "pollo", "albahaca", "ajo", "piñones", "queso parmesano", "aceite de oliva"],
        description: "Una clásica pasta italiana con una salsa de pesto casera y trozos de pollo a la parrilla.",
        instructions: [
            "Cocina la pasta según las instrucciones del paquete.",
            "Mientras tanto, cocina el pollo cortado en cubos en una sartén con un poco de aceite.",
            "Para el pesto, mezcla en un procesador de alimentos la albahaca, ajo, piñones, queso parmesano y aceite de oliva.",
            "Escurre la pasta y mezcla con el pesto y el pollo.",
            "Sirve con queso parmesano rallado por encima."
        ],
        nutritionInfo: {
            calories: 520,
            protein: 28,
            carbs: 65,
            fat: 18
        }
    },
    {
        id: 2,
        title: "Tacos de Carnitas",
        image: "/api/placeholder/400/320",
        cuisine: "mexican",
        prepTime: 45,
        difficulty: "medium",
        ingredients: ["carne de cerdo", "tortillas de maíz", "cebolla", "cilantro", "lima", "sal", "comino", "chile en polvo"],
        description: "Auténticos tacos mexicanos con carnitas jugosas y sabrosas.",
        instructions: [
            "Corta la carne de cerdo en trozos grandes y sazona con sal, comino y chile en polvo.",
            "Cocina a fuego lento en una olla grande con un poco de agua durante 2-3 horas hasta que esté tierna.",
            "Desmenuza la carne y dórala en una sartén caliente para que quede crujiente por fuera.",
            "Calienta las tortillas de maíz en una sartén seca.",
            "Sirve la carne en las tortillas y añade cebolla picada, cilantro y un chorrito de jugo de lima."
        ],
        nutritionInfo: {
            calories: 380,
            protein: 25,
            carbs: 30,
            fat: 15
        }
    },
    {
        id: 3,
        title: "Ensalada Mediterránea",
        image: "/api/placeholder/400/320",
        cuisine: "spanish",
        prepTime: 15,
        difficulty: "easy",
        ingredients: ["lechuga", "tomate", "pepino", "cebolla roja", "aceitunas", "queso feta", "aceite de oliva", "vinagre", "orégano"],
        description: "Ensalada fresca y ligera con ingredientes mediterráneos e ideal para días calurosos.",
        instructions: [
            "Lava y corta la lechuga en trozos pequeños.",
            "Corta los tomates, pepinos y cebolla roja en dados.",
            "Añade las aceitunas y el queso feta desmenuzado.",
            "Prepara un aliño con aceite de oliva, vinagre y orégano.",
            "Mezcla todo justo antes de servir."
        ],
        nutritionInfo: {
            calories: 220,
            protein: 8,
            carbs: 12,
            fat: 16
        }
    },
    {
        id: 4,
        title: "Arroz Frito con Verduras",
        image: "/api/placeholder/400/320",
        cuisine: "asian",
        prepTime: 30,
        difficulty: "medium",
        ingredients: ["arroz", "zanahoria", "guisantes", "maíz", "huevo", "cebolla", "ajo", "salsa de soja", "aceite de sésamo"],
        description: "Un sabroso plato asiático de arroz frito con verduras, perfecto como plato principal o acompañamiento.",
        instructions: [
            "Cocina el arroz y déjalo enfriar (preferiblemente del día anterior).",
            "En un wok o sartén grande, calienta un poco de aceite y saltea la cebolla y el ajo.",
            "Añade las verduras cortadas en dados pequeños y saltea a fuego alto.",
            "Aparta las verduras, bate los huevos en el mismo wok y revuelve.",
            "Incorpora el arroz frío, las verduras y la salsa de soja.",
            "Mezcla bien a fuego alto hasta que todo esté caliente.",
            "Añade un chorrito de aceite de sésamo antes de servir."
        ],
        nutritionInfo: {
            calories: 340,
            protein: 9,
            carbs: 65,
            fat: 6
        }
    },
    {
        id: 5,
        title: "Hamburguesa Casera",
        image: "/api/placeholder/400/320",
        cuisine: "american",
        prepTime: 35,
        difficulty: "medium",
        ingredients: ["carne molida", "pan de hamburguesa", "lechuga", "tomate", "cebolla", "queso cheddar", "ketchup", "mostaza", "sal", "pimienta"],
        description: "Deliciosa hamburguesa casera con todos los ingredientes clásicos.",
        instructions: [
            "Mezcla la carne molida con sal y pimienta, forma hamburguesas de unos 180g cada una.",
            "Cocina las hamburguesas en una parrilla o sartén caliente, 3-4 minutos por cada lado.",
            "Añade el queso cheddar en los últimos minutos para que se derrita.",
            "Tuesta ligeramente los panes de hamburguesa.",
            "Monta la hamburguesa con la carne, lechuga, tomate, cebolla y tus salsas favoritas."
        ],
        nutritionInfo: {
            calories: 580,
            protein: 32,
            carbs: 45,
            fat: 28
        }
    }
];

// Variables globales
let currentSection = 'search';
let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
let weeklyPlanner = JSON.parse(localStorage.getItem('weeklyPlanner')) || {};
let collections = JSON.parse(localStorage.getItem('collections')) || {
    'all': 'Todas las favoritas',
    'breakfast': 'Desayunos',
    'lunch': 'Almuerzos',
    'dinner': 'Cenas'
};
let activeCollection = 'all';
let currentWeek = new Date();

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', () => {
    // Asignar eventos a la navegación principal
    document.getElementById('nav-search').addEventListener('click', (e) => {
        e.preventDefault();
        changeSection('search');
    });
    
    document.getElementById('nav-favorites').addEventListener('click', (e) => {
        e.preventDefault();
        changeSection('favorites');
        renderFavorites();
    });
    
    document.getElementById('nav-planner').addEventListener('click', (e) => {
        e.preventDefault();
        changeSection('planner');
        renderPlanner();
    });
    
    // Eventos para la búsqueda de recetas
    document.getElementById('search-button').addEventListener('click', searchRecipes);
    document.getElementById('ingredients-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchRecipes();
    });
    
    // Eventos para las colecciones de favoritos
    document.querySelectorAll('.collection-item').forEach(item => {
        item.addEventListener('click', () => {
            activeCollection = item.dataset.collection;
            document.querySelectorAll('.collection-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            renderFavorites(activeCollection);
        });
    });
    
    // Eventos para el planificador semanal
    document.getElementById('prev-week').addEventListener('click', () => changeWeek(-1));
    document.getElementById('next-week').addEventListener('click', () => changeWeek(1));
    document.getElementById('generate-shopping-list').addEventListener('click', generateShoppingList);
    document.getElementById('clear-planner').addEventListener('click', clearPlanner);
    
    // Cerrar modales
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.add('hidden');
            });
        });
    });
    
    // Inicializar página con resultados de ejemplo
    renderMockResults();
});

// Cambiar entre secciones
function changeSection(section) {
    currentSection = section;
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden-section'));
    document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
    
    document.getElementById(`${section}-section`).classList.remove('hidden-section');
    document.getElementById(`nav-${section}`).classList.add('active');
}

// Renderizar resultados simulados
function renderMockResults() {
    const recipesGrid = document.getElementById('recipes-grid');
    recipesGrid.innerHTML = '';
    
    MOCK_RECIPES.forEach(recipe => {
        recipesGrid.appendChild(createRecipeCard(recipe));
    });
}

// Buscar recetas (simulado)
function searchRecipes() {
    const ingredients = document.getElementById('ingredients-input').value.toLowerCase();
    const cuisine = document.getElementById('cuisine-filter').value;
    const time = document.getElementById('time-filter').value;
    const difficulty = document.getElementById('difficulty-filter').value;
    
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('recipes-grid').innerHTML = '';
    document.getElementById('no-results').classList.add('hidden');
    
    // Simulamos un pequeño retraso para dar sensación de carga
    setTimeout(() => {
        let results = MOCK_RECIPES;
        
        // Filtro por ingredientes
        if (ingredients) {
            const ingredientList = ingredients.split(',').map(i => i.trim());
            results = results.filter(recipe => 
                ingredientList.some(ing => recipe.ingredients.some(i => i.includes(ing)))
            );
        }
        
        // Filtro por tipo de cocina
        if (cuisine) {
            results = results.filter(recipe => recipe.cuisine === cuisine);
        }
        
        // Filtro por tiempo de preparación
        if (time) {
            results = results.filter(recipe => recipe.prepTime <= parseInt(time));
        }
        
        // Filtro por dificultad
        if (difficulty) {
            results = results.filter(recipe => recipe.difficulty === difficulty);
        }
        
        document.getElementById('loading').classList.add('hidden');
        
        if (results.length === 0) {
            document.getElementById('no-results').classList.remove('hidden');
        } else {
            const recipesGrid = document.getElementById('recipes-grid');
            results.forEach(recipe => {
                recipesGrid.appendChild(createRecipeCard(recipe));
            });
        }
    }, 1000);
}

// Crear tarjeta de receta
function createRecipeCard(recipe) {
    const isFavorite = favoriteRecipes.some(fav => fav.id === recipe.id);
    
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
        <div class="recipe-info">
            <h4 class="recipe-title">${recipe.title}</h4>
            <div class="recipe-metadata">
                <span><i class="fas fa-globe"></i> ${getCuisineName(recipe.cuisine)}</span>
                <span><i class="far fa-clock"></i> ${recipe.prepTime} min</span>
            </div>
            <p class="recipe-description">${recipe.description}</p>
            <div class="recipe-actions">
                <button class="recipe-btn view-recipe" data-id="${recipe.id}">
                    <i class="far fa-eye"></i> Ver receta
                </button>
                <button class="recipe-btn favorite-btn ${isFavorite ? 'active' : ''}" data-id="${recipe.id}">
                    <i class="far ${isFavorite ? 'fas' : 'far'} fa-heart"></i>
                </button>
            </div>
        </div>
    `;
    
    // Evento para ver detalles de la receta
    card.querySelector('.view-recipe').addEventListener('click', () => {
        showRecipeDetails(recipe);
    });
    
    // Evento para marcar como favorita
    card.querySelector('.favorite-btn').addEventListener('click', (e) => {
        toggleFavorite(recipe);
        const btn = e.currentTarget;
        btn.classList.toggle('active');
        btn.querySelector('i').classList.toggle('far');
        btn.querySelector('i').classList.toggle('fas');
    });
    
    return card;
}

// Mostrar detalles de la receta
function showRecipeDetails(recipe) {
    const modal = document.getElementById('recipe-modal');
    const detailsContainer = document.getElementById('recipe-details');
    
    const isFavorite = favoriteRecipes.some(fav => fav.id === recipe.id);
    
    detailsContainer.innerHTML = `
        <div class="recipe-details-header">
            <img src="${recipe.image}" alt="${recipe.title}" class="recipe-details-img">
            <div class="recipe-details-info">
                <h2 class="recipe-details-title">${recipe.title}</h2>
                <div class="recipe-details-meta">
                    <span class="meta-item"><i class="fas fa-globe"></i> ${getCuisineName(recipe.cuisine)}</span>
                    <span class="meta-item"><i class="far fa-clock"></i> ${recipe.prepTime} minutos</span>
                    <span class="meta-item"><i class="fas fa-chart-line"></i> ${getDifficultyName(recipe.difficulty)}</span>
                </div>
                <p class="recipe-details-description">${recipe.description}</p>
                <div class="recipe-details-actions">
                    <button id="detail-favorite-btn" class="recipe-btn favorite-btn ${isFavorite ? 'active' : ''}" data-id="${recipe.id}">
                        <i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i> ${isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
                    </button>
                    <button id="add-to-planner-btn" class="recipe-btn">
                        <i class="fas fa-calendar-plus"></i> Añadir al planificador
                    </button>
                </div>
            </div>
        </div>
        <div class="recipe-sections">
            <div class="recipe-section">
                <h4><i class="fas fa-shopping-basket"></i> Ingredientes</h4>
                <ul>
                    ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                </ul>
            </div>
            <div class="recipe-section">
                <h4><i class="fas fa-utensils"></i> Información Nutricional</h4>
                <ul>
                    <li><strong>Calorías:</strong> ${recipe.nutritionInfo.calories} kcal</li>
                    <li><strong>Proteínas:</strong> ${recipe.nutritionInfo.protein} g</li>
                    <li><strong>Carbohidratos:</strong> ${recipe.nutritionInfo.carbs} g</li>
                    <li><strong>Grasas:</strong> ${recipe.nutritionInfo.fat} g</li>
                </ul>
            </div>
            <div class="recipe-section" style="grid-column: span 2;">
                <h4><i class="fas fa-list-ol"></i> Instrucciones</h4>
                <ol>
                    ${recipe.instructions.map(step => `<li>${step}</li>`).join('')}
                </ol>
            </div>
        </div>
    `;
    
    // Evento para marcar como favorita desde los detalles
    document.getElementById('detail-favorite-btn').addEventListener('click', () => {
        toggleFavorite(recipe);
        showRecipeDetails(recipe); // Actualizar modal
    });
    
    // Evento para añadir al planificador
    document.getElementById('add-to-planner-btn').addEventListener('click', () => {
        modal.classList.add('hidden');
        changeSection('planner');
        renderPlanner();
        // Aquí podrías mostrar un modal o UI para elegir el día/comida
        alert('¡Arrastra esta receta al planificador para agregarla a tu menú semanal!');
    });
    
    modal.classList.remove('hidden');
}

// Alternar receta como favorita
function toggleFavorite(recipe) {
    const index = favoriteRecipes.findIndex(fav => fav.id === recipe.id);
    
    if (index === -1) {
        // Añadir a favoritos
        favoriteRecipes.push({
            ...recipe,
            collections: ['all']
        });
    } else {
        // Quitar de favoritos
        favoriteRecipes.splice(index, 1);
    }
    
    // Guardar en localStorage
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    
    // Actualizar UI si estamos en la sección de favoritos
    if (currentSection === 'favorites') {
        renderFavorites();
    }
}

// Renderizar recetas favoritas
function renderFavorites() {
    const favoritesGrid = document.getElementById('favorites-grid');
    const noFavorites = document.getElementById('no-favorites');
    
    favoritesGrid.innerHTML = '';
    
    let recipesToShow;
    
    if (activeCollection === 'all') {
        recipesToShow = favoriteRecipes;
    } else {
        recipesToShow = favoriteRecipes.filter(recipe => 
            recipe.collections && recipe.collections.includes(activeCollection)
        );
    }
    
    if (recipesToShow.length === 0) {
        noFavorites.classList.remove('hidden');
    } else {
        noFavorites.classList.add('hidden');
        recipesToShow.forEach(recipe => {
            favoritesGrid.appendChild(createRecipeCard(recipe));
        });
    }
}

// Renderizar planificador semanal
function renderPlanner() {
    updateWeekDisplay();
    
    // Limpiar slots actuales
    document.querySelectorAll('.meal-slot').forEach(slot => {
        slot.innerHTML = '';
        slot.classList.remove('has-meal');
        
        // Reiniciar eventos de drag & drop
        slot.ondragover = allowDrop;
        slot.ondrop = drop;
    });
    
    // Cargar comidas del planificador
    const weekId = getWeekId(currentWeek);
    const weekPlan = weeklyPlanner[weekId] || {};
    
    for (const [dayMeal, recipeId] of Object.entries(weekPlan)) {
        const [day, meal] = dayMeal.split('-');
        const slot = document.querySelector(`.meal-slot[data-day="${day}"][data-meal="${meal}"]`);
        
        if (slot) {
            const recipe = MOCK_RECIPES.find(r => r.id === parseInt(recipeId)) || 
                           favoriteRecipes.find(r => r.id === parseInt(recipeId));
            
            if (recipe) {
                addMealToSlot(slot, recipe);
            }
        }
    }
}

// Añadir comida a un slot del planificador
function addMealToSlot(slot, recipe) {
    slot.innerHTML = `
        <div class="meal-card" draggable="true" data-recipe-id="${recipe.id}">
            <div class="meal-content">
                <div class="meal-title">${recipe.title}</div>
                <div class="meal-cuisine">${getCuisineName(recipe.cuisine)}</div>
            </div>
            <div class="meal-actions">
                <button class="meal-btn view-meal" data-id="${recipe.id}">
                    <i class="far fa-eye"></i>
                </button>
                <button class="meal-btn remove-meal">
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
        </div>
    `;
    
    slot.classList.add('has-meal');
    
    // Añadir eventos
    const mealCard = slot.querySelector('.meal-card');
    mealCard.addEventListener('dragstart', drag);
    
    slot.querySelector('.view-meal').addEventListener('click', () => {
        const recipeObj = MOCK_RECIPES.find(r => r.id === recipe.id) || 
                         favoriteRecipes.find(r => r.id === recipe.id);
        showRecipeDetails(recipeObj);
    });
    
    slot.querySelector('.remove-meal').addEventListener('click', () => {
        removeMealFromPlanner(slot);
    });
}

// Cambiar semana en el planificador
function changeWeek(direction) {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() + (direction * 7));
    currentWeek = newDate;
    renderPlanner();
}

// Actualizar display de la semana
function updateWeekDisplay() {
    const startDate = new Date(currentWeek);
    startDate.setDate(startDate.getDate() - startDate.getDay() + 1); // Lunes de la semana
    
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6); // Domingo
    
    const formatDate = (date) => {
        return date.getDate() + ' de ' + 
               ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 
                'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'][date.getMonth()];
    };
    
    document.getElementById('week-display').textContent = 
        `Semana del ${formatDate(startDate)} al ${formatDate(endDate)}, ${endDate.getFullYear()}`;
}

// Obtener ID único para la semana actual
function getWeekId(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - d.getDay() + 1); // Lunes
    return `week-${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

// Funciones para drag & drop
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    const recipeId = ev.target.dataset.recipeId;
    ev.dataTransfer.setData("recipeId", recipeId);
}

function drop(ev) {
    ev.preventDefault();
    const recipeId = ev.dataTransfer.getData("recipeId");
    const recipe = MOCK_RECIPES.find(r => r.id === parseInt(recipeId)) || 
                  favoriteRecipes.find(r => r.id === parseInt(recipeId));
    
    if (recipe) {
        const slot = ev.target.classList.contains('meal-slot') ? 
                    ev.target : ev.target.closest('.meal-slot');
        
        if (slot) {
            addMealToPlanner(slot, recipe);
        }
    }
}

// Añadir comida al planificador
function addMealToPlanner(slot, recipe) {
    const day = slot.dataset.day;
    const meal = slot.dataset.meal;
    const weekId = getWeekId(currentWeek);
    
    // Inicializar si no existe
    if (!weeklyPlanner[weekId]) {
        weeklyPlanner[weekId] = {};
    }
    
    // Guardar en el planificador
    weeklyPlanner[weekId][`${day}-${meal}`] = recipe.id;
    
    // Actualizar localStorage
    localStorage.setItem('weeklyPlanner', JSON.stringify(weeklyPlanner));
    
    // Actualizar UI
    addMealToSlot(slot, recipe);
}

// Eliminar comida del planificador
function removeMealFromPlanner(slot) {
    const day = slot.dataset.day;
    const meal = slot.dataset.meal;
    const weekId = getWeekId(currentWeek);
    
    if (weeklyPlanner[weekId]) {
        delete weeklyPlanner[weekId][`${day}-${meal}`];
        
        // Actualizar localStorage
        localStorage.setItem('weeklyPlanner', JSON.stringify(weeklyPlanner));
    }
    
    // Actualizar UI
    slot.innerHTML = '';
    slot.classList.remove('has-meal');
}

// Limpiar todo el planificador
function clearPlanner() {
    if (confirm('¿Estás seguro de que quieres eliminar todas las comidas planificadas para esta semana?')) {
        const weekId = getWeekId(currentWeek);
        delete weeklyPlanner[weekId];
        
        // Actualizar localStorage
        localStorage.setItem('weeklyPlanner', JSON.stringify(weeklyPlanner));
        
        // Actualizar UI
        renderPlanner();
    }
}

// Funciones auxiliares
function getCuisineName(code) {
    const cuisines = {
        'italian': 'Italiana',
        'mexican': 'Mexicana',
        'spanish': 'Española',
        'asian': 'Asiática',
        'american': 'Americana'
    };
    return cuisines[code] || code;
}

function getDifficultyName(code) {
    const difficulties = {
        'easy': 'Fácil',
        'medium': 'Media',
        'hard': 'Difícil'
    };
    return difficulties[code] || code;
}

function getIngredientCategory(ingredient) {
    const categories = {
        'Verduras': ['lechuga', 'tomate', 'cebolla', 'zanahoria', 'pepino', 'pimiento', 'ajo', 'guisantes', 'maíz'],
        'Frutas': ['manzana', 'plátano', 'naranja', 'limón', 'lima', 'fresa', 'uva'],
        'Carnes': ['pollo', 'cerdo', 'ternera', 'carne', 'hamburguesa', 'carnitas'],
        'Pescados': ['atún', 'salmón', 'bacalao', 'merluza', 'gambas', 'camarones'],
        'Lácteos': ['leche', 'queso', 'yogur', 'crema', 'mantequilla', 'parmesano', 'cheddar', 'feta'],
        'Cereales': ['arroz', 'pasta', 'fideos', 'quinoa', 'avena', 'pan'],
        'Legumbres': ['frijoles', 'garbanzos', 'lentejas', 'habas'],
        'Condimentos': ['sal', 'pimienta', 'comino', 'orégano', 'albahaca', 'cilantro', 'chile'],
        'Aceites': ['aceite', 'vinagre', 'salsa', 'sésamo'],
        'Otros': ['huevo', 'piñones', 'aceitunas', 'tortillas']
    };
    
    for (const [category, items] of Object.entries(categories)) {
        if (items.some(item => ingredient.includes(item))) {
            return category;
        }
    }
    
    return 'Otros';
}
{ slots actuales
    document.querySelectorAll('.meal-slot').forEach(slot => {
        slot.innerHTML = '';
        slot.classList.remove('has-meal');
        
        // Reiniciar eventos de drag & drop
        slot.ondragover = allowDrop;
        slot.ondrop = drop;
    });
    
    // Cargar comidas del planificador
    const weekId = getWeekId(currentWeek);
    const weekPlan = weeklyPlanner[weekId] || {};
    
    for (const [dayMeal, recipeId] of Object.entries(weekPlan)) {
        const [day, meal] = dayMeal.split('-');
        const slot = document.querySelector(`.meal-slot[data-day="${day}"][data-meal="${meal}"]`);
        
        if (slot) {
            const recipe = MOCK_RECIPES.find(r => r.id === parseInt(recipeId)) || 
                           favoriteRecipes.find(r => r.id === parseInt(recipeId));
            
            if (recipe) {
                addMealToSlot(slot, recipe);
            }
        }
    }
}

// Añadir comida a un slot del planificador
function addMealToSlot(slot, recipe) {
    slot.innerHTML = `
        <div class="meal-card" draggable="true" data-recipe-id="${recipe.id}">
            <div class="meal-content">
                <div class="meal-title">${recipe.title}</div>
                <div class="meal-cuisine">${getCuisineName(recipe.cuisine)}</div>
            </div>
            <div class="meal-actions">
                <button class="meal-btn view-meal" data-id="${recipe.id}">
                    <i class="far fa-eye"></i>
                </button>
                <button class="meal-btn remove-meal">
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
        </div>
    `;
    
    slot.classList.add('has-meal');
    
    // Añadir eventos
    const mealCard = slot.querySelector('.meal-card');
    mealCard.addEventListener('dragstart', drag);
    
    slot.querySelector('.view-meal').addEventListener('click', () => {
        const recipeObj = MOCK_RECIPES.find(r => r.id === recipe.id) || 
                         favoriteRecipes.find(r => r.id === recipe.id);
        showRecipeDetails(recipeObj);
    });
    
    slot.querySelector('.remove-meal').addEventListener('click', () => {
        removeMealFromPlanner(slot);
    });
}

// Cambiar semana en el planificador
function changeWeek(direction) {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() + (direction * 7));
    currentWeek = newDate;
    renderPlanner();
}

// Actualizar display de la semana
function updateWeekDisplay() {
    const startDate = new Date(currentWeek);
    startDate.setDate(startDate.getDate() - startDate.getDay() + 1); // Lunes de la semana
    
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6); // Domingo
    
    const formatDate = (date) => {
        return date.getDate() + ' de ' + 
               ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 
                'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'][date.getMonth()];
    };
    
    document.getElementById('week-display').textContent = 
        `Semana del ${formatDate(startDate)} al ${formatDate(endDate)}, ${endDate.getFullYear()}`;
}

// Obtener ID único para la semana actual
function getWeekId(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - d.getDay() + 1); // Lunes
    return `week-${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

// Funciones para drag & drop
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    const recipeId = ev.target.dataset.recipeId;
    ev.dataTransfer.setData("recipeId", recipeId);
}

function drop(ev) {
    ev.preventDefault();
    const recipeId = ev.dataTransfer.getData("recipeId");
    const recipe = MOCK_RECIPES.find(r => r.id === parseInt(recipeId)) || 
                  favoriteRecipes.find(r => r.id === parseInt(recipeId));
    
    if (recipe) {
        const slot = ev.target.classList.contains('meal-slot') ? 
                    ev.target : ev.target.closest('.meal-slot');
        
        if (slot) {
            addMealToPlanner(slot, recipe);
        }
    }
}

// Añadir comida al planificador
function addMealToPlanner(slot, recipe) {
    const day = slot.dataset.day;
    const meal = slot.dataset.meal;
    const weekId = getWeekId(currentWeek);
    
    // Inicializar si no existe
    if (!weeklyPlanner[weekId]) {
        weeklyPlanner[weekId] = {};
    }
    
    // Guardar en el planificador
    weeklyPlanner[weekId][`${day}-${meal}`] = recipe.id;
    
    // Actualizar localStorage
    localStorage.setItem('weeklyPlanner', JSON.stringify(weeklyPlanner));
    
    // Actualizar UI
    addMealToSlot(slot, recipe);
}

// Eliminar comida del planificador
function removeMealFromPlanner(slot) {
    const day = slot.dataset.day;
    const meal = slot.dataset.meal;
    const weekId = getWeekId(currentWeek);
    
    if (weeklyPlanner[weekId]) {
        delete weeklyPlanner[weekId][`${day}-${meal}`];
        
        // Actualizar localStorage
        localStorage.setItem('weeklyPlanner', JSON.stringify(weeklyPlanner));
    }
    
    // Actualizar UI
    slot.innerHTML = '';
    slot.classList.remove('has-meal');
}

// Limpiar todo el planificador
function clearPlanner() {
    if (confirm('¿Estás seguro de que quieres eliminar todas las comidas planificadas para esta semana?')) {
        const weekId = getWeekId(currentWeek);
        delete weeklyPlanner[weekId];
        
        // Actualizar localStorage
        localStorage.setItem('weeklyPlanner', JSON.stringify(weeklyPlanner));
        
        // Actualizar UI
        renderPlanner();
    }
}

// Generar lista de compras
function generateShoppingList() {
    const modal = document.getElementById('shopping-list-modal');
    const listContainer = document.getElementById('shopping-list');
    
    // Limpiar lista previa
    listContainer.innerHTML = '';
    
    const weekId = getWeekId(currentWeek);
    const weekPlan = weeklyPlanner[weekId] || {};
    
    if (Object.keys(weekPlan).length === 0) {
        listContainer.innerHTML = '<p>No hay comidas planificadas para esta semana. Añade recetas al planificador para generar una lista de compras.</p>';
        modal.classList.remove('hidden');
        return;
    }
    
    // Recopilar todos los ingredientes
    const allIngredients = [];
    
    for (const recipeId of Object.values(weekPlan)) {
        const recipe = MOCK_RECIPES.find(r => r.id === parseInt(recipeId)) || 
                      favoriteRecipes.find(r => r.id === parseInt(recipeId));
        
        if (recipe && recipe.ingredients) {
            recipe.ingredients.forEach(ing => {
                const existingIng = allIngredients.find(i => i.name === ing);
                if (existingIng) {
                    existingIng.count++;
                } else {
                    allIngredients.push({
                        name: ing,
                        count: 1,
                        category: getIngredientCategory(ing)
                    });
                }
            });
        }
    }
    
    // Ordenar por categoría
    allIngredients.sort((a, b) => {
        if (a.category === b.category) {
            return a.name.localeCompare(b.name);
        }
        return a.category.localeCompare(b.category);
    });
    
    // Generar HTML de la lista
    allIngredients.forEach(ing => {
        const item = document.createElement('li');
        item.innerHTML = `
            <div>
                <input type="checkbox" class="item-checkbox">
                <span>${ing.name}${ing.count > 1 ? ` (x${ing.count})` : ''}</span>
            </div>
            <span class="item-category">${ing.category}</span>
        `;
        listContainer.appendChild(item);
    });
    
    // Mostrar modal
    modal.classList.remove('hidden');
    
    // Asignar evento al botón de imprimir
    document.getElementById('print-list').addEventListener('click', () => {
        window.print();
    });
}

// Funciones auxiliares
function getCuisineName(code) {
    const cuisines = {
        'italian': 'Italiana',
        'mexican': 'Mexicana',
        'spanish': 'Española',
        'asian': 'Asiática',
        'american': 'Americana'
    };
    return cuisines[code] || code;
}

function getDifficultyName(code) {
    const difficulties = {
        'easy': 'Fácil',
        'medium': 'Media',
        'hard': 'Difícil'
    };
    return difficulties[code] || code;
}

function getIngredientCategory(ingredient) {
    const categories = {
        'Verduras': ['lechuga', 'tomate', 'cebolla', 'zanahoria', 'pepino', 'pimiento', 'ajo', 'guisantes', 'maíz'],
        'Frutas': ['manzana', 'plátano', 'naranja', 'limón', 'lima', 'fresa', 'uva'],
        'Carnes': ['pollo', 'cerdo', 'ternera', 'carne', 'hamburguesa', 'carnitas'],
        'Pescados': ['atún', 'salmón', 'bacalao', 'merluza', 'gambas', 'camarones'],
        'Lácteos': ['leche', 'queso', 'yogur', 'crema', 'mantequilla', 'parmesano', 'cheddar', 'feta'],
        'Cereales': ['arroz', 'pasta', 'fideos', 'quinoa', 'avena', 'pan'],
        'Legumbres': ['frijoles', 'garbanzos', 'lentejas', 'habas'],
        'Condimentos': ['sal', 'pimienta', 'comino', 'orégano', 'albahaca', 'cilantro', 'chile'],
        'Aceites': ['aceite', 'vinagre', 'salsa', 'sésamo'],
        'Otros': ['huevo', 'piñones', 'aceitunas', 'tortillas']
    };
    
    for (const [category, items] of Object.entries(categories)) {
        if (items.some(item => ingredient.includes(item))) {
            return category;
        }
    }
    
    return 'Otros';
}