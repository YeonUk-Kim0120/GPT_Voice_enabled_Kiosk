import './Call.css';

function Call({ showModal }) {
  return (
    <div>
      <button className="callButton" onClick={showModal}>
        직원 호출!
      </button>
    </div>
  );
}

export default Call;
