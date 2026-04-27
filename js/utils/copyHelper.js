export function getNextCopyTitle(originalTitle, existingCards) {
    let baseTitle = originalTitle.replace(/Копия\d+$/, '').trim();
    if (baseTitle === '') baseTitle = originalTitle; 

    const existingTitles = existingCards.map(card => card.title);

    let maxCopyNumber = 0;
    const regex = new RegExp(`^${escapeRegex(baseTitle)}Копия(\\d+)$`);

    for (const title of existingTitles) {
        const match = title.match(regex);
        if (match) {
            const num = parseInt(match[1], 10);
            if (num > maxCopyNumber) maxCopyNumber = num;
        }
    }

    return `${baseTitle}Копия${maxCopyNumber + 1}`;
}

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
