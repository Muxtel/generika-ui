import { jsx as _jsx } from "react/jsx-runtime";
function renderSmartValue(value) {
    if (value === null || value === undefined)
        return "-";
    if (typeof value === "boolean")
        return value ? "✔️" : "❌";
    if (Array.isArray(value)) {
        if (value.length === 0)
            return "[]";
        return (_jsx("ul", { style: { margin: 0, paddingLeft: "1em" }, children: value.map((v, i) => (_jsx("li", { children: renderSmartValue(v) }, i))) }));
    }
    if (typeof value === "object") {
        // Cas courant : object avec champ 'nom' ou 'name'
        if ("nom" in value)
            return value.nom;
        if ("name" in value)
            return value.name;
        // Sinon JSON compacté
        return _jsx("code", { children: JSON.stringify(value) });
    }
    if (typeof value === "string" && isIsoDate(value)) {
        return new Date(value).toLocaleDateString();
    }
    return String(value);
}
// Vérifie si une string est au format ISO 8601
function isIsoDate(value) {
    return /^\d{4}-\d{2}-\d{2}T/.test(value);
}
// Transforme "type_tache" → "Type Tache"
// Ceci ne sert plus à rien étant donnée qu'on peut récupérer les title et description via les schemas !!!!
function formatLabel(key) {
    return key
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}
export { renderSmartValue, isIsoDate, formatLabel };
