
export const shuffle = <T>(arr: T[]): T[] => {
    const arrCopy = [...arr]
    for(let i = arrCopy.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]]
    }
    return arrCopy;
}

export const getCategoryRank = (catIndex: number) => {
        switch (catIndex) {
            case 0:
                return "yellow"
            case 1:
                return "green"
            case 2:
                return "blue"
            case 3:
                return "purple"
        }
    }
