import { createContext, useContext, useEffect, useState } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

interface IAppContext {
    isAppLoading: boolean;
    setIsAppLoading: (v: boolean) => void;

    carts: ICart[];
    setCarts: (v: ICart[]) => void;
}

const CurrentAppContext = createContext<IAppContext | null>(null);

type TProps = {
    children: React.ReactNode
}

export const AppProvider = (props: TProps) => {
    const [isAppLoading, setIsAppLoading] = useState<boolean>(true);
    const [carts, setCarts] = useState<ICart[]>([])

    useEffect(() => {
        const fetchAccount = async () => {
            const carts = localStorage.getItem("carts");

                if (carts) {
                    setCarts(JSON.parse(carts))
                }
    
            setIsAppLoading(false)
        }

        fetchAccount();
    }, [])

    return (
        <>
            {isAppLoading === false ?
                <CurrentAppContext.Provider value={{
                    isAppLoading, setIsAppLoading,
                    carts, setCarts
                }}>
                    {props.children}
                </CurrentAppContext.Provider>
                :
                <div style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                }}>
                    <PacmanLoader
                        size={30}
                        color="#36d6b4"
                    />
                </div>
            }

        </>

    );
};

export const useCurrentApp = () => {
    const currentAppContext = useContext(CurrentAppContext);

    if (!currentAppContext) {
        throw new Error(
            "useCurrentApp has to be used within <CurrentAppContext.Provider>"
        );
    }

    return currentAppContext;
};

