import {useState} from 'react';

type SettingsButtonProps = {
    text: string,
    onClick: () => void
}

const SettingsButton =  (props: SettingsButtonProps) => {
    return (
    <>
        <div className='settingsButtonContainer'>
            <button className="settingsButton" onClick={props.onClick}>{props.text}</button>
        </div>
    </>
    )
}

export default SettingsButton;