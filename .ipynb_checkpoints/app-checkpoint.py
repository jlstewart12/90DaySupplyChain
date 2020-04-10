from flask import Flask, render_template


# Create an instance of our Flask app.
app = Flask(__name__)


#This will be your data
data = {'a':'b'}


# Set route
@app.route('/')
def index():
    # Store the entire team collection in a list
    

    # Return the template with the teams list passed in
    return render_template('index.html', holder = data)


if __name__ == "__main__":
    app.run(debug=True)
