/* Journey state, itinerary rendering, cost estimates, and local plan storage. */
(() => {
  const STORAGE_KEY = "roamwellSavedPlans";
  const SELECTION_KEY = "roamwellSelection";
  const destinations = (window.ROAMWELL_DESTINATIONS || []).filter((destination) => destination.state === "Maharashtra");
  const styles = [
    { id: "beach", name: "Beach", icon: "🏖", description: "Sea air, sandy toes, and nowhere urgent to be.", scene: "style-beach" },
    { id: "hills", name: "Hills & mountains", icon: "⛰", description: "Fresh air, scenic walks, and a change of altitude.", scene: "style-hills" },
    { id: "heritage", name: "Heritage & culture", icon: "🏛", description: "Old streets, layered stories, and local craft.", scene: "style-heritage" },
    { id: "adventure", name: "Adventure", icon: "🧭", description: "A little movement, a new view, and a story to tell.", scene: "style-adventure" },
    { id: "wildlife", name: "Wildlife & nature", icon: "🌿", description: "Wide-open landscapes and time outside.", scene: "style-wildlife" },
    { id: "spiritual", name: "Spiritual", icon: "☼", description: "A quieter rhythm and meaningful places.", scene: "style-spiritual" },
    { id: "city", name: "Weekend city break", icon: "☕", description: "Neighborhood finds, great food, and city energy.", scene: "style-city" }
  ].filter((style) => destinations.some((destination) => destination.styles.includes(style.id)));
  const budgetNames = { budget: "Budget", standard: "Standard", premium: "Premium" };
  const interestNames = ["Food", "Photography", "Nightlife", "Shopping", "Relaxation", "Kids-friendly"];
  const mealTypes = ["breakfast", "lunch", "dinner"];
  const mealPreferenceNames = { veg: "Vegetarian", nonveg: "Non-vegetarian" };
  const page = document.body.dataset.page;
  const params = new URLSearchParams(window.location.search);

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
  }

  function money(amount) {
    return `₹${Math.round(amount).toLocaleString("en-IN")}`;
  }

  function readSelection() {
    const raw = localStorage.getItem(SELECTION_KEY);
    if (!raw) return {};
    try {
      const value = JSON.parse(raw);
      return value && typeof value === "object" ? value : {};
    } catch (error) {
      console.error("Could not read the previous trip selection.", error);
      return {};
    }
  }

  function setSelection(selection) {
    localStorage.setItem(SELECTION_KEY, JSON.stringify(selection));
  }

  function readPlans() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { plans: [], error: "" };
    try {
      const plans = JSON.parse(raw);
      if (!Array.isArray(plans)) throw new TypeError("Saved plans must be a list.");
      return { plans: plans.filter((plan) => plan && typeof plan === "object"), error: "" };
    } catch (error) {
      console.error("Saved plans could not be read.", error);
      return { plans: [], error: "Saved plans could not be read. The stored browser data may be damaged; you can clear this site’s saved data in browser settings." };
    }
  }

  function findDestination(id) {
    return destinations.find((destination) => destination.id === id);
  }

  function getStyleName(styleId) {
    return styles.find((style) => style.id === styleId)?.name || "A little getaway";
  }

  function journeyUrl(selection) {
    const query = new URLSearchParams({
      style: selection.style,
      dest: selection.dest,
      duration: String(selection.duration),
      travellers: String(selection.travellers),
      budget: selection.budget,
      origin: selection.origin,
      interests: (selection.interests || []).join(","),
      ...Object.fromEntries(mealTypes.map((type) => [`${type}Diet`, selection.mealPreferences?.[type] || "veg"]))
    });
    return `./plan.html?${query.toString()}`;
  }

  function readPlanChoices() {
    const previous = readSelection();
    const choice = {
      style: params.get("style") || previous.style,
      dest: params.get("dest") || previous.dest,
      duration: Number(params.get("duration") || previous.duration || 3),
      travellers: Number(params.get("travellers") || previous.travellers || 2),
      budget: params.get("budget") || previous.budget || "budget",
      origin: params.get("origin") || previous.origin || "Delhi",
      interests: (params.get("interests") ?? (previous.interests || []).join(","))
        .split(",").filter((interest) => interestNames.includes(interest)),
      mealPreferences: Object.fromEntries(mealTypes.map((type) => {
        const preference = params.get(`${type}Diet`) || previous.mealPreferences?.[type] || "veg";
        return [type, Object.hasOwn(mealPreferenceNames, preference) ? preference : "veg"];
      }))
    };
    return choice;
  }

  function validChoices(choice, destination) {
    return Boolean(destination)
      && ["1", "2", "3"].includes(String(choice.duration))
      && destination.state === "Maharashtra"
      && Number.isInteger(Number(choice.travellers))
      && Number(choice.travellers) >= 1
      && Number(choice.travellers) <= 10
      && Object.hasOwn(budgetNames, choice.budget)
      && typeof choice.origin === "string"
      && choice.origin.length > 0;
  }

  function preferenceUrl(style, dest) {
    const query = new URLSearchParams({ style, dest });
    return `./preferences.html?${query.toString()}`;
  }

  function initStyles() {
    const grid = document.querySelector("#trip-styles-grid");
    if (!grid) return;
    grid.innerHTML = styles.map((style) => `
      <a class="style-card ${style.scene}" href="./destinations.html?style=${encodeURIComponent(style.id)}">
        <span class="style-card-icon" aria-hidden="true">${style.icon}</span>
        <span class="style-card-copy"><strong>${escapeHtml(style.name)}</strong><small>${escapeHtml(style.description)}</small></span>
        <span class="style-card-arrow" aria-hidden="true">↗</span>
      </a>`).join("");
  }

  function initDestinations() {
    const grid = document.querySelector("#destination-grid");
    if (!grid) return;
    const current = readSelection();
    const style = params.get("style") || current.style;
    if (!styles.some((item) => item.id === style)) {
      window.location.replace("./trip-styles.html");
      return;
    }
    setSelection({ ...current, style });
    const heading = document.querySelector("#destination-eyebrow");
    if (heading) heading.textContent = `A little ${getStyleName(style).toLowerCase()} inspiration`;
    const chips = document.querySelector("#destination-filters");
    if (chips) {
      chips.innerHTML = styles.map((item) => `<a class="filter-chip ${item.id === style ? "is-selected" : ""}" href="./destinations.html?style=${encodeURIComponent(item.id)}" ${item.id === style ? 'aria-current="true"' : ""}>${escapeHtml(item.name)}</a>`).join("");
    }
    const search = document.querySelector("#destination-search");
    const render = () => {
      const query = (search?.value || "").trim().toLowerCase();
      const matches = destinations.filter((destination) => destination.styles.includes(style)
        && `${destination.name} ${destination.state} ${destination.highlights.join(" ")} ${destination.stops.map((stop) => stop[0]).join(" ")}`.toLowerCase().includes(query));
      if (!matches.length) {
        grid.innerHTML = `<div class="empty-state"><span class="empty-icon">⌕</span><h2>No places found</h2><p>Try another search, or choose a different trip style.</p><a class="button button-primary" href="./trip-styles.html">Change trip style</a></div>`;
        return;
      }
      grid.innerHTML = matches.map((destination) => {
        const minStay = destination.costs.budget.stay;
        const minFood = destination.costs.budget.food;
        const startCost = (destination.costs.budget.transport + destination.costs.budget.local
          + minFood + destination.costs.budget.activities) * 1.1;
        return `<article class="destination-card">
          <div class="destination-art"><img src="${escapeHtml(destination.photo.src)}" alt="${escapeHtml(destination.photo.alt)}" loading="lazy" decoding="async"><span class="destination-region">${escapeHtml(destination.region)}</span><span class="destination-photo-credit">Photo: <a href="${escapeHtml(destination.photo.source)}" target="_blank" rel="noopener noreferrer">${escapeHtml(destination.photo.credit)}</a></span></div>
          <div class="destination-card-body"><div class="destination-meta"><span>${escapeHtml(destination.state)}</span><span>·</span><span>${escapeHtml(destination.idealDuration)}</span></div>
            <h2>${escapeHtml(destination.name)}</h2><p>${escapeHtml(destination.summary)}</p>
            <div class="highlight-tags">${destination.highlights.map((highlight) => `<span>${escapeHtml(highlight)}</span>`).join("")}</div>
            <dl class="destination-facts"><div><dt>Best season</dt><dd>${escapeHtml(destination.bestSeason)}</dd></div><div><dt>Starting estimate</dt><dd>${money(startCost)} <small>/ person*</small></dd></div></dl>
            <a class="button button-primary button-full" href="${preferenceUrl(style, destination.id)}">Choose ${escapeHtml(destination.name)} <span aria-hidden="true">→</span></a>
          </div></article>`;
      }).join("");
    };
    search?.addEventListener("input", render);
    render();
  }

  function initPreferences() {
    const form = document.querySelector("#preferences-form");
    if (!form) return;
    const previous = readSelection();
    const style = params.get("style") || previous.style;
    const destId = params.get("dest") || previous.dest;
    const destination = findDestination(destId);
    if (!destination) {
      window.location.replace(style && styles.some((item) => item.id === style)
        ? `./destinations.html?style=${encodeURIComponent(style)}`
        : "./trip-styles.html");
      return;
    }
    const selectedStyle = style && destination.styles.includes(style) ? style : destination.style;
    setSelection({ ...previous, style: selectedStyle, dest: destination.id });
    const back = document.querySelector("#preferences-back");
    if (back) back.href = `./destinations.html?style=${encodeURIComponent(selectedStyle)}`;
    const line = document.querySelector("#preferences-destination-line");
    if (line) line.textContent = `Planning for ${destination.name}, ${destination.state}. Set the details and we’ll shape your days.`;

    const savedDuration = Number(params.get("duration") || previous.duration);
    const savedTravellers = Number(params.get("travellers") || previous.travellers);
    const savedBudget = params.get("budget") || previous.budget;
    const savedOrigin = params.get("origin") || previous.origin;
    const savedInterests = (params.get("interests") || (previous.interests || []).join(",")).split(",");
    if ([1, 2, 3].includes(savedDuration)) form.elements.duration.value = String(savedDuration);
    if (Number.isInteger(savedTravellers) && savedTravellers >= 1 && savedTravellers <= 10) form.elements.travellers.value = String(savedTravellers);
    if (Object.hasOwn(budgetNames, savedBudget)) {
      const budgetRadio = form.querySelector(`input[name="budget"][value="${savedBudget}"]`);
      if (budgetRadio) budgetRadio.checked = true;
    }
    if (savedOrigin && [...form.elements.origin.options].some((option) => option.value === savedOrigin)) form.elements.origin.value = savedOrigin;
    form.querySelectorAll('input[name="interest"]').forEach((input) => { input.checked = savedInterests.includes(input.value); });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const error = document.querySelector("#preferences-error");
      const travellers = Number(form.elements.travellers.value);
      if (!form.elements.duration.value || ![1, 2, 3].includes(Number(form.elements.duration.value))) {
        error.textContent = "Choose a trip length from 1 to 3 days.";
        form.elements.duration.focus();
        return;
      }
      if (!Number.isInteger(travellers) || travellers < 1 || travellers > 10) {
        error.textContent = "Please choose between 1 and 10 travellers.";
        form.elements.travellers.focus();
        return;
      }
      if (!form.elements.origin.value) {
        error.textContent = "Please select the city you’re travelling from.";
        form.elements.origin.focus();
        return;
      }
      const choice = {
        style: selectedStyle, dest: destination.id,
        duration: Number(form.elements.duration.value), travellers,
        budget: form.querySelector('input[name="budget"]:checked')?.value || "budget",
        origin: form.elements.origin.value,
        interests: [...form.querySelectorAll('input[name="interest"]:checked')].map((input) => input.value),
        mealPreferences: Object.fromEntries(mealTypes.map((type) => {
          const preference = params.get(`${type}Diet`) || previous.mealPreferences?.[type] || "veg";
          return [type, Object.hasOwn(mealPreferenceNames, preference) ? preference : "veg"];
        }))
      };
      setSelection(choice);
      window.location.href = journeyUrl(choice);
    });
  }

  function estimateCosts(destination, choice) {
    const unit = destination.costs[choice.budget];
    const days = Number(choice.duration);
    const travellers = Number(choice.travellers);
    const nights = days - 1;
    const rooms = Math.ceil(travellers / 2);
    const values = {
      transport: unit.transport * travellers,
      local: unit.local * days * travellers,
      stay: unit.stay * nights * rooms,
      food: unit.food * days * travellers,
      activities: unit.activities * days * travellers
    };
    values.subtotal = Object.values(values).reduce((sum, value) => sum + value, 0);
    values.buffer = Math.ceil(values.subtotal * 0.1);
    values.total = values.subtotal + values.buffer;
    values.perPerson = Math.ceil(values.total / travellers);
    return { ...values, unit, nights, rooms };
  }

  function fillTemplate(text, destination, unit) {
    return text.replace(/\{\{(name|area|highlight1|highlight2|highlight3|meal1|meal2|meal3|food)\}\}/g, (match, key) => {
      const values = {
        name: destination.name, area: destination.area,
        highlight1: destination.highlights[0], highlight2: destination.highlights[1],
        highlight3: destination.highlights[2], meal1: destination.meals[0],
        meal2: destination.meals[1], meal3: destination.meals[2],
        food: unit.food
      };
      return values[key] ?? match;
    });
  }

  function visitMinutes(duration) {
    const hours = duration.match(/(\d+(?:\.\d+)?)[–-](\d+(?:\.\d+)?)\s*hours?/i);
    if (hours) return Math.round((Number(hours[1]) + Number(hours[2])) * 30);
    const minutes = duration.match(/(\d+)[–-](\d+)\s*minutes?/i);
    if (minutes) return Math.round((Number(minutes[1]) + Number(minutes[2])) / 2);
    return 90;
  }

  function formatTime(minutes) {
    const hour = Math.floor(minutes / 60) % 24;
    const minute = String(minutes % 60).padStart(2, "0");
    const period = hour >= 12 ? "pm" : "am";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minute} ${period}`;
  }

  function getRouteUrl(blocks, mode) {
    const addresses = blocks.map((block) => block.address);
    if (addresses.length === 1) {
      return `https://www.google.com/maps/search/?${new URLSearchParams({ api: "1", query: addresses[0] })}`;
    }
    const query = new URLSearchParams({
      api: "1", origin: addresses[0], destination: addresses[addresses.length - 1], travelmode: mode || "driving"
    });
    if (addresses.length > 2) query.set("waypoints", addresses.slice(1, -1).join("|"));
    return `https://www.google.com/maps/dir/?${query}`;
  }

  function getHotelUrl(hotel, destination) {
    return `https://www.google.com/maps/search/?${new URLSearchParams({ api: "1", query: `${hotel[0]}, ${hotel[1]}, ${destination.name}, Maharashtra` })}`;
  }

  function getItinerary(destination, duration, unit, interests, mealPreferences) {
    return Array.from({ length: duration }, (_, dayIndex) => {
      const stops = destination.stops.filter((stop, index) => Number.isInteger(stop[4])
        ? stop[4] === dayIndex
        : Math.floor(index / 3) === dayIndex);
      let nextStart = 9 * 60;
      return {
        title: destination.dayTitles[dayIndex],
        area: destination.dayAreas?.[dayIndex] || destination.area,
        mode: destination.dayModes?.[dayIndex] || "driving",
        number: dayIndex + 1,
        meals: mealTypes.map((type, index) => ({
          type,
          name: type[0].toUpperCase() + type.slice(1),
          time: ["8:00–9:00 am", "1:00–2:00 pm", "7:30–8:30 pm"][index],
          suggestion: destination.mealOptions?.[type]?.[mealPreferences[type]] || destination.meals[index]
        })),
        meal: `Food estimate: about ₹${unit.food} per person for the day.`,
        travel: destination.dayTravel?.[dayIndex] || "Check live traffic and route conditions between stops.",
        blocks: stops.map((stop, stopIndex) => {
          if (nextStart < 14 * 60 && nextStart + visitMinutes(stop[2]) > 13 * 60) nextStart = 14 * 60;
          const start = nextStart;
          const end = start + visitMinutes(stop[2]);
          nextStart = end + 20;
          return {
            activity: `Explore ${stop[0]}`,
            place: stop[0], address: stop[1],
            time: `${formatTime(start)}–${formatTime(end)}`, duration: stop[2], fee: "Varies; confirm locally",
            travel: stopIndex === 0 ? "Allow time to reach this area" : (destination.dayTravel?.[dayIndex] || "Check live traffic between stops"),
            tip: "Check current opening times, access, and local conditions before you go.",
            tags: stop[3], matched: stop[3].some((tag) => interests.includes(tag))
          };
        })
      };
    });
  }

  function renderPlan(choice, destination) {
    const costs = estimateCosts(destination, choice);
    const itinerary = getItinerary(destination, choice.duration, costs.unit, choice.interests, choice.mealPreferences);
    const start = Math.round(Date.now() / 1000);
    const activityCount = itinerary.reduce((count, day) => count + day.blocks.length, 0);
    const budgetLabel = budgetNames[choice.budget];
    const tableRows = [
      ["Transport to / from", costs.transport, "Approx. per traveller × group"],
      ["Local transport", costs.local, `${choice.duration} days × group`],
      [`Stay (${costs.rooms} room${costs.rooms === 1 ? "" : "s"} × ${costs.nights} nights)`, costs.stay, "Rooms based on 2 people each"],
      ["Food", costs.food, `${choice.duration} days × group`],
      ["Activities & entry fees", costs.activities, "Approx. per traveller × days"],
      ["10% buffer", costs.buffer, "For small changes and surprises"]
    ];
    const labels = { transport: "Transport", local: "Local travel", stay: "Stay", food: "Food", activities: "Activities", buffer: "10% buffer" };
    const parts = [
      ["transport", costs.transport], ["local", costs.local], ["stay", costs.stay],
      ["food", costs.food], ["activities", costs.activities], ["buffer", costs.buffer]
    ];
    const totalForChart = costs.total || 1;
    const colors = ["#5578d8", "#56a893", "#e5a853", "#d98164", "#9a77bd", "#a4ae9c"];
    let x = 0;
    const chartRects = parts.map(([key, amount], index) => {
      const width = amount / totalForChart * 600;
      const rect = `<rect x="${x.toFixed(2)}" y="8" width="${Math.max(width, 0).toFixed(2)}" height="24" rx="3" fill="${colors[index]}"><title>${labels[key]}: ${money(amount)}</title></rect>`;
      x += width;
      return rect;
    }).join("");
    const choiceData = { ...choice, id: `${destination.id}-${start}`, savedAt: new Date().toISOString(), total: costs.total, perPerson: costs.perPerson };
    setSelection(choice);
    const matchedCount = itinerary.reduce((sum, day) => sum + day.blocks.filter((block) => block.matched).length, 0);
    const returnHref = `./preferences.html?${new URLSearchParams({ style: choice.style, dest: destination.id, duration: choice.duration, travellers: choice.travellers, budget: choice.budget, origin: choice.origin, interests: choice.interests.join(","), ...Object.fromEntries(mealTypes.map((type) => [`${type}Diet`, choice.mealPreferences[type]])) }).toString()}`;
    return `
      <section class="plan-hero"><div><span class="eyebrow">A first draft, made for you</span><h1>${escapeHtml(destination.name)}<span class="text-gradient">, your way.</span></h1><p>${escapeHtml(destination.summary)}</p></div><div class="plan-hero-art art-${escapeHtml(destination.color)}"><span aria-hidden="true">${escapeHtml(destination.icon)}</span></div></section>
      <section class="summary-card" aria-label="Trip summary"><div class="summary-heading"><div><span class="eyebrow">YOUR TRIP AT A GLANCE</span><h2>${escapeHtml(destination.name)}, ${escapeHtml(destination.state)}</h2></div><span class="budget-badge">${escapeHtml(budgetLabel)} pace</span></div>
        <div class="summary-facts"><div><span>TRIP LENGTH</span><strong>${choice.duration} days · ${costs.nights} nights</strong></div><div><span>TRAVELLERS</span><strong>${choice.travellers} ${choice.travellers === 1 ? "person" : "people"}</strong></div><div><span>TRAVELLING FROM</span><strong>${escapeHtml(choice.origin)}</strong></div><div><span>BEST SEASON</span><strong>${escapeHtml(destination.bestSeason)}</strong></div></div>
        <div class="summary-costs"><div><span>ESTIMATED TOTAL</span><strong>${money(costs.total)}</strong></div><div><span>PER PERSON</span><strong>${money(costs.perPerson)}</strong></div><small>Approximate estimates in INR · includes a 10% buffer</small></div>
      </section>
      <div class="estimate-alert"><span aria-hidden="true">ⓘ</span><p><strong>Friendly estimate, not a booking quote.</strong> Prices are approximate, can change by season and availability, and must be verified directly before booking. Transport depends on your actual route from ${escapeHtml(choice.origin)}.</p></div>
      <div class="plan-actions no-print"><button type="button" class="button button-primary" data-action="print">Print / Save as PDF</button><button type="button" class="button button-outline" data-action="copy-plan">Copy plan as text</button><button type="button" class="button button-outline" data-action="save-plan">Save plan</button><button type="button" class="button button-outline" data-action="share-plan">Share link</button><a class="button button-quiet" href="${returnHref}">Modify preferences</a><span class="action-status" role="status" aria-live="polite"></span></div>
      <section class="plan-section itinerary-section"><div class="section-heading"><div><span class="eyebrow">A day-by-day starting point</span><h2>Your ${choice.duration} days in ${escapeHtml(destination.name)}</h2></div><p>${matchedCount ? `${matchedCount} of ${activityCount} ideas match your interests.` : `${activityCount} flexible ideas to get you started.`}</p></div>
        ${choice.interests.length ? `<p class="interest-summary">Your interests: ${choice.interests.map((interest) => `<span>${escapeHtml(interest)}</span>`).join("")}. Matched ideas are highlighted below.</p>` : ""}
        <div class="meal-preferences" aria-label="Meal preferences">${mealTypes.map((type) => `<label class="field-label" for="${type}-diet">${type[0].toUpperCase() + type.slice(1)} preference<select id="${type}-diet" data-meal-preference="${type}"><option value="veg" ${choice.mealPreferences[type] === "veg" ? "selected" : ""}>Vegetarian</option><option value="nonveg" ${choice.mealPreferences[type] === "nonveg" ? "selected" : ""}>Non-vegetarian</option></select></label>`).join("")}</div>
        <div class="day-tabs" role="tablist" aria-label="Trip days">${itinerary.map((day, index) => `<button type="button" class="day-tab ${index === 0 ? "is-active" : ""}" id="day-tab-${index + 1}" role="tab" aria-selected="${index === 0}" aria-controls="day-panel-${index + 1}" tabindex="${index === 0 ? "0" : "-1"}" data-day="${index}">Day ${index + 1}</button>`).join("")}</div>
        ${itinerary.map((day, index) => `<section class="day-panel ${index === 0 ? "is-active" : ""}" id="day-panel-${index + 1}" role="tabpanel" aria-labelledby="day-tab-${index + 1}" ${index ? "hidden" : ""}>
          <div class="day-panel-heading"><div><span class="eyebrow">DAY ${day.number} · ${escapeHtml(day.area)}</span><h3>${escapeHtml(day.title)}</h3><p class="day-route-note">${escapeHtml(day.travel)}</p></div><a class="day-route-link" href="${getRouteUrl(day.blocks, day.mode)}" target="_blank" rel="noopener noreferrer">Open day route <span aria-hidden="true">↗</span></a></div>
          <div class="activity-grid">${day.blocks.map((block) => `<article class="activity-card ${block.matched ? "is-match" : ""}"><div class="activity-topline"><span>${escapeHtml(block.time)}</span>${block.matched ? '<span class="match-tag">✦ Your pick</span>' : ""}</div><h4>${escapeHtml(block.activity)}</h4><p class="activity-place">⌖ ${escapeHtml(block.address)}</p><dl class="activity-facts"><div><dt>AVERAGE VISIT</dt><dd>${escapeHtml(block.duration)}</dd></div><div><dt>ENTRY</dt><dd>${escapeHtml(block.fee)}</dd></div><div><dt>LOCAL TRAVEL</dt><dd>${escapeHtml(block.travel)}</dd></div></dl><p class="activity-tip"><strong>Place:</strong> ${escapeHtml(block.place)}. ${escapeHtml(block.tip)}</p></article>`).join("")}</div>
          <div class="meal-schedule" aria-label="Meal schedule">${day.meals.map((meal) => `<div><strong>${escapeHtml(meal.name)}</strong><span>${escapeHtml(meal.time)}</span><small data-meal-suggestion="${meal.type}">${escapeHtml(meal.suggestion)}</small></div>`).join("")}</div>
        </section>`).join("")}
      </section>
      <section class="plan-section two-panel-grid"><article class="info-panel hotel-panel"><span class="eyebrow">Stay options</span><h2>Hotels near ${escapeHtml(destination.area)}</h2><p>Compare these options by location. Google Maps shows current review ratings and directions; availability and rates change.</p><ul class="hotel-options">${destination.hotels.slice(0, 5).map((hotel) => `<li><a href="${getHotelUrl(hotel, destination)}" target="_blank" rel="noopener noreferrer"><span><strong>${escapeHtml(hotel[0])}</strong><small>${escapeHtml(hotel[1])}</small></span><span class="hotel-map-link">Google Maps ↗</span></a></li>`).join("")}</ul><div class="stay-price"><span>${escapeHtml(budgetLabel)} estimate</span><strong>${money(costs.unit.stay)} <small>/ room / night</small></strong></div><small class="muted-copy">Estimate assumes two people per room; ${costs.rooms} room${costs.rooms === 1 ? "" : "s"} for your group. Verify recent reviews and cancellation terms.</small></article>
        <article class="info-panel meal-budget-panel"><span class="eyebrow">Local flavors</span><h2>Leave room for a second helping</h2><p>${destination.meals.map((meal) => escapeHtml(meal)).join(" · ")}</p><div class="stay-price"><span>Food estimate</span><strong>${money(costs.unit.food)} <small>/ person / day</small></strong></div><small class="muted-copy">Ask about ingredients and current prices, especially for seasonal specialties.</small></article></section>
      <section class="plan-section budget-section"><div class="section-heading"><div><span class="eyebrow">The numbers, made clear</span><h2>Approximate trip budget</h2></div><p>INR · estimated for ${choice.travellers} ${choice.travellers === 1 ? "traveller" : "travellers"}</p></div>
        <div class="budget-layout"><div class="budget-table-wrap"><table class="budget-table"><thead><tr><th scope="col">Category</th><th scope="col">Estimate</th><th scope="col">How it’s counted</th></tr></thead><tbody>${tableRows.map(([label, amount, note]) => `<tr><th scope="row">${label}</th><td>${money(amount)}</td><td>${escapeHtml(note)}</td></tr>`).join("")}
          <tr class="grand-total"><th scope="row">Grand total</th><td>${money(costs.total)}</td><td>All travellers</td></tr><tr class="per-person-row"><th scope="row">Per-person total</th><td>${money(costs.perPerson)}</td><td>Grand total ÷ ${choice.travellers}</td></tr></tbody></table>
          <p class="budget-assumption">Transport to/from, local transport, food, and activities multiply by traveller count. Stay is priced per room and night, with one room per two people (rounded up). The 10% buffer is applied to the subtotal.</p></div>
          <figure class="budget-chart"><figcaption>Where the estimate goes</figcaption><svg viewBox="0 0 600 40" role="img" aria-label="Estimated budget distribution: ${parts.map(([key, value]) => `${labels[key]} ${money(value)}`).join(", ")}">${chartRects}</svg><ul class="chart-legend">${parts.map(([key, amount], index) => `<li><span style="--legend-color:${colors[index]}"></span>${escapeHtml(labels[key])}<strong>${money(amount)}</strong></li>`).join("")}</ul></figure></div>
      </section>
      <section class="plan-section trip-payment" aria-labelledby="trip-payment-heading"><div><span class="eyebrow">Trip member contributions</span><h2 id="trip-payment-heading">Chip in for the trip</h2><p>Scan with PhonePe to send your trip contribution.</p><p class="trip-payment-note">Confirm the amount with your group before paying. Roamwell does not process or track transfers.</p></div><figure class="trip-payment-qr"><img src="./assets/phonepe-trip-qr.jpeg" alt="PhonePe payment QR code" width="642" height="632" decoding="async"><figcaption>PhonePe</figcaption></figure></section>
      <section class="plan-section two-panel-grid practical-grid"><article class="info-panel"><span class="eyebrow">A few things to pack</span><h2>Little essentials</h2><div class="packing-list">${["Reusable water bottle", "Comfortable walking shoes", "Weather-appropriate layers", "Personal medicines & basic first aid", "Sun protection", "Photo ID and booking details"].map((item) => `<label><input type="checkbox"><span>${item}</span></label>`).join("")}</div></article>
        <article class="info-panel"><span class="eyebrow">Travel thoughtfully</span><h2>Do’s & don’ts</h2><ul class="practical-list"><li><strong>Do:</strong> Check current local conditions, opening hours, and any permits before setting out.</li><li><strong>Do:</strong> Dress respectfully at places of worship and ask before taking people’s photographs.</li><li><strong>Don’t:</strong> Leave marked public areas, feed wildlife, or ignore local safety instructions.</li><li><strong>Don’t:</strong> Rely on this estimate as a confirmed fare, reservation, or official travel advisory.</li></ul></article></section>
      <section class="plan-section local-notes"><div><span class="eyebrow">Keep handy</span><h2>Local transport & safety notes</h2><p>Use licensed taxis, registered guides, or established public transport. Confirm fares before starting a journey, share your route with someone you trust, and check local traffic, weather, and park or trail advisories. In India, call <strong>112</strong> for emergency assistance; verify local services and keep your accommodation’s contact details handy.</p></div><span class="local-note-icon" aria-hidden="true">⌖</span></section>
      <p class="plan-disclaimer">Roamwell’s itinerary and prices are approximate planning suggestions only. Verify prices, availability, permits, transport routes, opening times, and safety information with reliable local sources before booking or travel.</p>`;
  }

  function planText(choice, destination) {
    const costs = estimateCosts(destination, choice);
    const itinerary = getItinerary(destination, choice.duration, costs.unit, choice.interests, choice.mealPreferences);
    const lines = [
      `ROAMWELL TRIP PLAN — ${destination.name}, ${destination.state}`,
      `${choice.duration} days · ${choice.travellers} traveller(s) · ${budgetNames[choice.budget]} · departing from ${choice.origin}`,
      `Best season: ${destination.bestSeason}`,
      `Estimated total: ${money(costs.total)} · per person: ${money(costs.perPerson)}`,
      `Prices are approximate estimates. Verify before booking.`,
      ""
    ];
    itinerary.forEach((day) => {
      lines.push(`DAY ${day.number}: ${day.title}`);
      day.blocks.forEach((block, index) => {
        lines.push(`${block.time} — ${block.activity} at ${block.place}, ${block.address} (average visit ${block.duration}; entry ${block.fee}; ${block.travel}). Tip: ${block.tip}`);
      });
      day.meals.forEach((meal) => lines.push(`${meal.time} ${meal.name}: ${meal.suggestion}`));
      lines.push(`Day route: ${day.travel}`, "");
    });
    lines.push(`Stay estimate: ${money(costs.unit.stay)} per room per night in ${destination.area}.`);
    lines.push(`Budget: transport ${money(costs.transport)}, local travel ${money(costs.local)}, stay ${money(costs.stay)}, food ${money(costs.food)}, activities ${money(costs.activities)}, buffer ${money(costs.buffer)}.`);
    return lines.join("\n");
  }

  function initPlan() {
    const container = document.querySelector("#plan-content");
    if (!container) return;
    const choice = readPlanChoices();
    const destination = findDestination(choice.dest);
    if (!destination || !validChoices(choice, destination)) {
      const previous = readSelection();
      const target = previous.dest && findDestination(previous.dest)
        ? `./preferences.html?${new URLSearchParams({ style: previous.style || destination?.style || "beach", dest: previous.dest }).toString()}`
        : "./trip-styles.html";
      container.innerHTML = `<div class="empty-state"><span class="empty-icon">✦</span><h1>Let’s get your trip details first.</h1><p>This plan link is missing some details or has an invalid destination. You can start again or pick up your last selection.</p><a class="button button-primary" href="${target}">Continue planning →</a></div>`;
      return;
    }
    if (!destination.styles.includes(choice.style)) choice.style = destination.style;
    const computed = estimateCosts(destination, choice);
    container.innerHTML = renderPlan(choice, destination);
    const actionStatus = container.querySelector(".action-status");
    container.querySelector('[data-action="print"]')?.addEventListener("click", () => window.print());
    container.querySelector('[data-action="copy-plan"]')?.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(planText(choice, destination));
        actionStatus.textContent = "Trip plan copied to your clipboard.";
      } catch (error) {
        console.error("Could not copy the trip plan.", error);
        actionStatus.textContent = "Copy is unavailable here. Try printing the plan or copying the page URL instead.";
      }
    });
    container.querySelector('[data-action="share-plan"]')?.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        actionStatus.textContent = "Share link copied to your clipboard.";
      } catch (error) {
        console.error("Could not copy the share link.", error);
        actionStatus.textContent = "Copy is unavailable here. You can copy the address from your browser’s address bar.";
      }
    });
    container.querySelector('[data-action="save-plan"]')?.addEventListener("click", () => {
      const state = readPlans();
      if (state.error) {
        actionStatus.textContent = state.error;
        return;
      }
      const mealKey = mealTypes.map((type) => choice.mealPreferences[type]).join("-");
      const id = `${destination.id}-${choice.duration}-${choice.travellers}-${choice.budget}-${choice.origin.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${mealKey}`;
      const plan = {
        id, dest: destination.id, destination: destination.name, style: choice.style,
        duration: choice.duration, travellers: choice.travellers, budget: choice.budget,
        origin: choice.origin, interests: choice.interests, mealPreferences: choice.mealPreferences, total: computed.total,
        perPerson: computed.perPerson, savedAt: new Date().toISOString()
      };
      const plans = [plan, ...state.plans.filter((saved) => saved.id !== id)];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
      actionStatus.textContent = "Plan saved in this browser.";
    });
    container.querySelectorAll("[data-meal-preference]").forEach((select) => {
      select.addEventListener("change", () => {
        const type = select.dataset.mealPreference;
        choice.mealPreferences[type] = Object.hasOwn(mealPreferenceNames, select.value) ? select.value : "veg";
        setSelection(choice);
        const query = new URLSearchParams(window.location.search);
        query.set(`${type}Diet`, choice.mealPreferences[type]);
        window.history.replaceState({}, "", `${window.location.pathname}?${query.toString()}`);
        const modifyLink = container.querySelector('a.button-quiet[href*="preferences.html"]');
        if (modifyLink) {
          const modifyQuery = new URLSearchParams(modifyLink.search);
          modifyQuery.set(`${type}Diet`, choice.mealPreferences[type]);
          modifyLink.href = `./preferences.html?${modifyQuery.toString()}`;
        }
        const suggestion = destination.mealOptions?.[type]?.[choice.mealPreferences[type]] || destination.meals[mealTypes.indexOf(type)];
        container.querySelectorAll(`[data-meal-suggestion="${type}"]`).forEach((node) => { node.textContent = suggestion; });
      });
    });
    const tabs = [...container.querySelectorAll('[role="tab"]')];
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => activateDay(tab, tabs, container));
      tab.addEventListener("keydown", (event) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        const currentIndex = tabs.indexOf(tab);
        const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1
          : (currentIndex + (event.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length;
        activateDay(tabs[nextIndex], tabs, container);
        tabs[nextIndex].focus();
      });
    });
  }

  function activateDay(tab, tabs, container) {
    tabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
      item.tabIndex = active ? 0 : -1;
      const panel = container.querySelector(`#${item.getAttribute("aria-controls")}`);
      if (panel) {
        panel.hidden = !active;
        panel.classList.toggle("is-active", active);
      }
    });
  }

  function initSavedPlans() {
    const list = document.querySelector("#saved-plans-list");
    if (!list) return;
    const state = readPlans();
    const status = document.querySelector("#saved-status");
    if (state.error && status) status.textContent = state.error;
    if (!state.plans.length) {
      list.innerHTML = `<div class="empty-state"><span class="empty-icon">♡</span><h2>No saved plans just yet</h2><p>When a trip catches your eye, save it and it’ll be here next time you visit in this browser.</p><a class="button button-primary" href="./trip-styles.html">Find a getaway →</a></div>`;
      return;
    }
    list.innerHTML = state.plans.map((plan) => {
      const destination = findDestination(plan.dest);
      const name = destination?.name || plan.destination || "A Roamwell trip";
      const imageClass = destination ? `art-${destination.color}` : "art-city";
      const openUrl = journeyUrl(plan);
      return `<article class="saved-card"><div class="saved-card-art ${imageClass}"><span>${escapeHtml(destination?.icon || "✦")}</span></div><div class="saved-card-content"><span class="eyebrow">${escapeHtml(budgetNames[plan.budget] || "Flexible")} pace</span><h2>${escapeHtml(name)}</h2><p>${escapeHtml(String(plan.duration))} days · ${escapeHtml(String(plan.travellers))} traveller${Number(plan.travellers) === 1 ? "" : "s"} · ${money(Number(plan.total) || 0)} total</p><small>Saved ${escapeHtml(new Date(plan.savedAt).toLocaleDateString())}</small><div class="saved-card-actions"><a class="button button-primary" href="${openUrl}">Open plan →</a><button class="button button-danger-outline" type="button" data-delete="${escapeHtml(plan.id)}">Delete</button></div></div></article>`;
    }).join("");
    list.querySelectorAll("[data-delete]").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-delete");
        const fresh = readPlans();
        if (fresh.error) {
          if (status) status.textContent = fresh.error;
          return;
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh.plans.filter((plan) => plan.id !== id)));
        if (status) status.textContent = "Saved plan deleted.";
        initSavedPlans();
      });
    });
  }

  function initCompare() {
    const container = document.querySelector("#compare-content");
    if (!container) return;
    const state = readPlans();
    if (!state.plans.length) {
      container.innerHTML = `<div class="empty-state"><span class="empty-icon">⇄</span><h2>Save two plans to compare them</h2><p>Your saved trips will appear here so you can compare costs and activity highlights side by side.</p><a class="button button-primary" href="./trip-styles.html">Plan your first trip →</a></div>`;
      return;
    }
    const options = state.plans.map((plan, index) => `<option value="${index}">${escapeHtml(findDestination(plan.dest)?.name || plan.destination || "Trip")} · ${plan.duration} days · ${money(Number(plan.total) || 0)}</option>`).join("");
    container.innerHTML = `<div class="compare-selectors"><label class="field-label" for="compare-a">First plan<select id="compare-a">${options}</select></label><label class="field-label" for="compare-b">Second plan<select id="compare-b">${options}</select></label></div><div id="compare-results" class="compare-grid" aria-live="polite"></div>`;
    const first = container.querySelector("#compare-a");
    const second = container.querySelector("#compare-b");
    const results = container.querySelector("#compare-results");
    if (state.plans.length > 1) second.selectedIndex = 1;
    const render = () => {
      const selected = [state.plans[Number(first.value)], state.plans[Number(second.value)]].filter(Boolean);
      results.innerHTML = selected.map((plan) => {
        const destination = findDestination(plan.dest);
        const itinerary = destination ? getItinerary(destination, Math.min(Number(plan.duration) || 1, 3), destination.costs[plan.budget] || destination.costs.budget, [], plan.mealPreferences || { breakfast: "veg", lunch: "veg", dinner: "veg" }) : [];
        const highlights = itinerary.map((day) => `<li><strong>Day ${day.number}:</strong> ${escapeHtml(day.title)}</li>`).join("");
        return `<article class="compare-card"><span class="eyebrow">${escapeHtml(budgetNames[plan.budget] || "Flexible")} · ${plan.duration} days</span><h2>${escapeHtml(destination?.name || plan.destination || "Trip")}</h2><p>${escapeHtml(destination?.state || "")} · ${escapeHtml(String(plan.travellers))} traveller${Number(plan.travellers) === 1 ? "" : "s"}</p><div class="compare-total"><span>Estimated total</span><strong>${money(Number(plan.total) || 0)}</strong><small>${money(Number(plan.perPerson) || 0)} per person</small></div><h3>Activity rhythm</h3><ul>${highlights || "<li>Open the saved plan for its complete itinerary.</li>"}</ul><a class="text-link" href="${journeyUrl(plan)}">Open full plan →</a></article>`;
      }).join("");
    };
    first.addEventListener("change", render);
    second.addEventListener("change", render);
    render();
  }

  if (page === "styles") initStyles();
  if (page === "destinations") initDestinations();
  if (page === "preferences") initPreferences();
  if (page === "plan") initPlan();
  if (page === "saved") initSavedPlans();
  if (page === "compare") initCompare();
})();
