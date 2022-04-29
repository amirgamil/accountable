import styled from "styled-components";

export const Container = styled.div<{ majorColor?: string; hoverColor?: string; textColor?: string }>`
    button {
        border: none;
        color: ${(p) => (p.textColor ? p.textColor : "black")};
        &:hover {
            transition: 0.3s;
            background: ${(p) => (p.hoverColor ? p.hoverColor : "rgb(230, 145, 230)")};
            color: white;
        }
        border-radius: 24px;
        background-color: ${(p) => (p.majorColor ? p.majorColor : "rgb(237, 238, 242)")};
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
    majorColor?: string;
    hoverColor?: string;
    textColor?: string;
}

export const Button: React.FC<Props> = ({ onClick, children, disabled, majorColor, hoverColor, textColor }: Props) => {
    return (
        <Container
            textColor={textColor}
            hoverColor={hoverColor}
            majorColor={majorColor}
            className="my-2 w-full flex justify-center z-40"
        >
            <button disabled={disabled} onClick={onClick} className="border p-3 w-full">
                {children}
            </button>
        </Container>
    );
};
