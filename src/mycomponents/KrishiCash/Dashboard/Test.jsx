import React, { useEffect } from 'react';
// import './Product2.css'; // Import your CSS file

const YourComponent = () => {
    useEffect(() => {
        const tableTag = document.getElementById('tableOne')
        const handleResize = () => {
            const screenWidth = window.innerWidth;

            if (screenWidth < 768) {
                // Hide table header and show span tags
                tableTag.classList.add('table-sm')
                tableTag.classList.remove('table-lg')

            } else {
                // Show table header and hide span tags
                tableTag.classList.remove('table-sm')
                tableTag.classList.add('table-lg')
            }
        };

        // Call handleResize on component mount and window resize
        handleResize();
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            <table className='table-lg' id='tableOne'>
                <thead>
                    <tr>
                        <th>Column 1</th>
                        <th>Column 2</th>
                        <th>Column 3</th>
                        {/* Add more th elements as needed */}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <span className='movi'>Column 1</span>
                            <p>Data 1</p>
                        </td>
                        <td>
                            <span className='movi'>Column 2</span>
                            <p>Data 1</p>
                        </td>
                        <td>
                            <span className='movi'>Column 3</span>
                            <p>Data 1</p>
                        </td>
                        {/* Add more td elements as needed */}
                    </tr>
                    <tr>
                        <td>
                            <span className='movi'>Column 1</span>
                            <p>Data 1</p>
                        </td>
                        <td>
                            <span className='movi'>Column 2</span>
                            <p>Data 1</p>
                        </td>
                        <td>
                            <span className='movi'>Column 3</span>
                            <p>Data 1</p>
                        </td>
                        {/* Add more td elements as needed */}
                    </tr>
                    {/* Add more tr elements as needed */}
                </tbody>
            </table>
        </div>
    );
};

export default YourComponent;
