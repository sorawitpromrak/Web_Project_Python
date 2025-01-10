function toggleSolution(id) {
    const solution = document.getElementById(id);
    solution.style.display = (solution.style.display === 'none' || solution.style.display === '') ? 'block' : 'none';
}