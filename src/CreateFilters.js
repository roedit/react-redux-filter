function createFilters(data) {
    const projects = [];
    const assignee = [];
    const categories = [];
    const colors = ['#5cf7f9', '#ee0701', '#82e5c1', '#ce08c7', '#276a93', '#1d76db'];

    if(data) {
        data.forEach(ticket => {
            if(ticket.project && projects.filter(item => item.label === ticket.project).length ===0) {
                projects.push({
                    label: ticket.project,
                    checked: false
                })
            }

            if(ticket.assignee && assignee.filter(item => item.label === ticket.assignee).length ===0) {
                assignee.push({
                    label: ticket.assignee,
                    checked: false
                })
            }

            if(ticket.category && categories.filter(item => item.label === ticket.category).length ===0) {
                categories.push({
                    label: ticket.category,
                    color: colors[categories.length],
                    checked: false
                })
            }
        })
    }

    return { projects, assignee, categories}
}

export default createFilters;