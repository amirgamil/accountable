import styled from "styled-components";

const Container = styled.div`
    button {
        border: none;
        &:hover {
            transition: 0.3s;
            background: rgb(230, 145, 230);
            color: white;
        }
        border-radius: 24px;
        background-color: rgb(237, 238, 242);
        &:disabled {
            color: rgb(86, 90, 105);
            pointer-events: none;
        }
    }
`;

interface Props {
    onClick: (evt: React.MouseEvent<HTMLButtonElement>) => void;
    children: React.ReactNode;
    disabled?: boolean;
}

export const Button: React.FC<Props> = ({ onClick, children, disabled }: Props) => {
    return (
        <Container className="my-10 w-full flex justify-center z-40">
            <button disabled={disabled} onClick={onClick} className="border p-3 w-full">
                {children}
            </button>
        </Container>
    );
};
