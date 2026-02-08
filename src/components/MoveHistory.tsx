import React, { useEffect, useRef } from 'react';

interface MoveHistoryProps {
    history: string[];
}

const MoveHistory: React.FC<MoveHistoryProps> = ({ history }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when history updates
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    // Group moves into pairs (White, Black)
    const movePairs: { white: string; black?: string }[] = [];
    for (let i = 0; i < history.length; i += 2) {
        movePairs.push({
            white: history[i],
            black: history[i + 1]
        });
    }

    return (
        <div className="move-history-card">
            <h3>Move History</h3>
            <div className="move-list" ref={scrollRef}>
                {movePairs.length === 0 ? (
                    <div className="empty-history">No moves yet</div>
                ) : (
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>White</th>
                                <th>Black</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movePairs.map((pair, index) => (
                                <tr key={index}>
                                    <td className="move-number">{index + 1}.</td>
                                    <td className="move-notation">{pair.white}</td>
                                    <td className="move-notation">{pair.black || ''}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default MoveHistory;
