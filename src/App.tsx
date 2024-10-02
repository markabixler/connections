import './App.css'
import { Grid } from "./components/Grid.tsx";
import {Button} from "./components/Button.tsx";
import {useEffect, useRef, useState} from "react";
import {getCategoryRank, shuffle} from "./utils/utils.ts";
import {Category, Item} from "./utils/types.ts";


function App() {
    const [items, setItems] = useState<Item[]>([])
    const [selected, setSelected] = useState<Item[]>([])
    const [completed, setCompleted] = useState<Category[]>([])
    const [mistakes, setMistakes] = useState<number>(4)
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const categoryRanking = useRef<Category[]>([])

    useEffect(() => {
        if(gameOver || items.length > 0) {
            return;
        }
        setTimeout(() => {
            fetch("/data.json")
            .then(r =>r.text())
            .then(text => {
                const data: Category[] = JSON.parse(text)
                const items: Item[] = []
                data.forEach((i: Category, index) => {
                    const cat = {...i, rank: getCategoryRank(index)}
                    let inArray = false;
                    for(let j = 0; j < categoryRanking.current.length; j++) {
                        if(categoryRanking.current[j].title === cat.title) {
                            inArray = true;
                            break;
                        }
                    }
                    if(!inArray) {
                        categoryRanking.current.push(cat);
                    }
                    i.cards.forEach(c => {
                        items.push({
                            text: c,
                            category: i.title
                        });
                    });
                });
                setItems(shuffle(items));
                setIsLoading(false);
            });
        }, 2000);

    }, [gameOver, items]);

    const shuffleCards = () => {
        setItems(shuffle(items));
        setSelected([])
    }

    const handleCardClicked = (card: string) => {
        const item = items.filter(i => i.text === card)
        if(item.length === 0) {
            console.log("Something went wrong!")
            return;
        }
        const newSelected = [...selected]
        const selectedIndex = selected.indexOf(item[0])
        if (selectedIndex === -1) {
            if(selected.length === 4) {
                console.log(selected)
                console.log("You can only select four cards!")
                return;
            }
            newSelected.push(item[0])
        } else {
            newSelected.splice(selectedIndex, 1)
        }
        setSelected(newSelected)
    }

    const deselectAll = () => {
        setSelected([])
    }

    const handleSubmit = (guess: Item[]) => {
        const selectedCategories: Set<string> = new Set()
        guess.forEach(g => selectedCategories.add(g.category))
        if(selectedCategories.size > 1) {
            console.log("Incorrect Guess!")
            const remainingMistakes = mistakes - 1
            setMistakes(remainingMistakes);
            if(remainingMistakes === 0) {
                setGameOver(true);
                console.log(categoryRanking.current);
                setCompleted(categoryRanking.current)
                setItems([]);
                setError("");
            } else{
                setError("Incorrect Guess!");
            }
            return;
        }
        const category = categoryRanking.current.find(c => c.title === selectedCategories.values().next().value)
        if(!category) {
            console.log("Something went wrong!")
            return;
        }
        setError("");
        const newCompleted = [...completed, category]
        setCompleted(newCompleted)
        setSelected([])
        const newItems = items.filter(i => (!guess.includes(i)))
        setItems(newItems);
        if(newCompleted.length === 4 ) {
            setGameOver(true);
        }
    }

    const gameOverMessage = () => {
        const mistakesRemaining = mistakes;
        if(mistakesRemaining === 0) {
            return <p className="font-bold text-2xl text-red-600">Game Over! You've run out of mistakes!</p>
        }
        return <p className="font-bold text-2xl text-green-600">Congratulations! You've completed the game!</p>;
    }

    return isLoading ? <h1>Loading...</h1> : (
        <div id="app" className="w-full">
            <h3>Make four groups of four!</h3>
            <Grid
                items={items}
                selected={selected}
                onCardClicked={handleCardClicked}
                completedCategories={completed}
            />
            <p>Mistakes remaining: {mistakes}</p>
            {error.length > 0 && <p className="font-bold text-2xl text-red-600">{error}</p>}
            <div>
                {gameOver ? gameOverMessage() : (
                    <>
                        <Button
                            text="Shuffle"
                            onClick={() => shuffleCards()}
                        />
                        <Button
                            text="Deselect All"
                            onClick={() => deselectAll()}
                            disabled={selected.length === 0}
                        />
                        <Button
                            text="Submit"
                            onClick={() => handleSubmit(selected)}
                            disabled={selected.length < 4}
                        />
                    </>
                )}
            </div>
        </div>
    )
}

export default App
