import Container from "@/components/Container/Container.tsx";
import s from "./NotFound.module.scss"
import {useNavigate} from "react-router-dom";
import ParticlesBackground from "@/components/ParticlesBackground/ParticlesBackground.tsx";

const NotFound = () => {
    const navigate = useNavigate()
    return (
        <Container>
            <ParticlesBackground/>
            <div className={s.body}>
                <h1>По вашему запросу ничего не найдено(</h1>
                <button onClick={() => navigate('/')}>Вернуться на главную страницу</button>
            </div>
        </Container>
    );
};

export default NotFound;