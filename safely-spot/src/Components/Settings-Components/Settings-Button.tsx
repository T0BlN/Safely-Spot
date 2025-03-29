import './Settings-Button.css';
type SettingsButtonProps = {
    text: string,
    onClick: () => void
}

const SettingsButton =  (props: SettingsButtonProps) => {
    return (
    <>
        <div className='settings-button-container'>
            <button className="settings-button" onClick={props.onClick}>{props.text}</button>
        </div>
    </>
    )
}

export default SettingsButton;

