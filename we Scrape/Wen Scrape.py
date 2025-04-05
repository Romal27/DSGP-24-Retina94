import time
import pandas as pd
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.webdriver import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager

# Set up Selenium WebDriver
options = Options()
options.add_argument("--headless")  # Run in background
options.add_argument("--disable-gpu")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
options.add_argument(
    "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/110.0.5481.177 Safari/537.36"
)  # Use real user-agent to avoid bot detection

service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=options)

# URL to scrape
url = "https://frame.doc.lk:8090/all/search?doctor=&hospital=&specialization=10&date="
driver.get(url)

# Wait longer for JavaScript to load elements
time.sleep(5)

# Scroll to bottom to force content load
driver.find_element(By.TAG_NAME, "body").send_keys(Keys.END)
time.sleep(3)  # Allow time for data to load

# Check if data is loaded
try:
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, "container-search-results"))
    )
except:
    print("⚠️ No data found! The website might be blocking bots or loading data differently.")
    driver.quit()
    exit()

# Get updated page source and parse with BeautifulSoup
soup = BeautifulSoup(driver.page_source, "html.parser")
driver.quit()

# Extract hospital, doctor name, and specialization
hospital_data = []
hospitals = soup.find_all("h3", class_="ui-component-title")  # Extract hospital names
doctor_lists = soup.find_all("ul", class_="ui-component-list")  # Doctor lists under each hospital

if not hospitals:
    print("⚠️ No hospital data found. The page structure might have changed.")
else:
    for hospital, doctor_list in zip(hospitals, doctor_lists):
        hospital_name = hospital.text.strip()

        # Find doctors and specializations inside the <ul> tag
        doctors = doctor_list.find_all("li")  # Assuming doctor details are listed as <li> elements

        if doctors:
            for doctor in doctors:
                details = doctor.text.strip().split("-")  # Adjust split based on actual format
                doctor_name = details[0].strip() if len(details) > 0 else "N/A"
                specialization = details[1].strip() if len(details) > 1 else "N/A"

                hospital_data.append({
                    "Hospital": hospital_name,
                    "Doctor": doctor_name,
                    "Specialization": specialization
                })
        else:
            # If no doctors found, still store hospital name
            hospital_data.append({
                "Hospital": hospital_name,
                "Doctor": "N/A",
                "Specialization": "N/A"
            })

# Print extracted data for debugging
for entry in hospital_data:
    print(entry)

# Save to Excel
df = pd.DataFrame(hospital_data)
df.to_excel("Hospital_Doctor_List.xlsx", index=False)

print("✅ Scraping completed! Check 'Hospital_Doctor_List.xlsx'.")
