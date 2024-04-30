const { spawn, exec } = require('child_process');

exports.predictHandler = (req, res) => {
    try {
        const {
            type_of_food,
            number_of_guests,
            event_type,
            quantity_of_food,
            storage_conditions,
            purchase_history,
            seasonality,
            preparation_method,
            geographical_location,
            pricing,
        } = req.body;

        exec('python -m pip install scikit-learn pandas', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }

            const pythonScript = spawn('python', ['../server/pythonscripts/predictionModel.py']);

            let prediction = null;

            pythonScript.stdout.on('data', (data) => {
                prediction = parseFloat(data.toString().trim()).toFixed(2);
            });

            pythonScript.stderr.on('data', (data) => {
                console.error('Error:', data.toString());
            });

            pythonScript.on('close', (code) => {
                if (code === 0) {
                    res.json({ prediction });
                } else {
                    res.status(500).json({ error: 'An error occurred while making the prediction.' });
                }
            });

            pythonScript.stdin.write(JSON.stringify({
                type_of_food,
                number_of_guests,
                event_type,
                quantity_of_food,
                storage_conditions,
                purchase_history,
                seasonality,
                preparation_method,
                geographical_location,
                pricing,
            }));
            pythonScript.stdin.end();
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while making the prediction.' });
    }
}