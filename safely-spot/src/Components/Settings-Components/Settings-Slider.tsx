import './SliderToggle.css'; // We'll create this CSS file next

interface SliderToggleProps {
  currentVal: boolean;
  handleToggle: () => void;
}

const SliderToggle = (props: SliderToggleProps) => {



  return (
    <div className={`slider-container ${props.currentVal ? 'yes' : 'no'}`} onClick={props.handleToggle}>
      <div className="slider-button"></div>
    </div>
  );
};

export default SliderToggle;