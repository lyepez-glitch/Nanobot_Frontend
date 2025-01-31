// components/Cell.js
export default function Cell({ id, state, onClick }) {
  const stateColors = {
      healthy: 'bg-green-300',
      damaged: 'bg-yellow-300',
      cancerous: 'bg-red-300',
  };

  return (
      <div
          className={`p-4 m-2 rounded-lg ${stateColors[state]}`}
          onClick={() => onClick(id)}
      >
          <p>Cell  - {state}</p>
      </div>
  );
}
