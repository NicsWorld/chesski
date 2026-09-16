from playwright.sync_api import sync_playwright

def run_cuj(page):
    # Go to app
    page.goto("http://localhost:5173/?fen=rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR%20w%20KQkq%20-%200%201")
    page.wait_for_timeout(1000)

    # Verify New Game button is visible
    new_game_btn = page.get_by_role("button", name="New Game")
    new_game_btn.wait_for(state="visible")

    # Handle the dialog automatically when it pops up
    # We will accept it (simulate OK)
    page.once("dialog", lambda dialog: dialog.accept())

    # Click New Game
    new_game_btn.click()
    page.wait_for_timeout(1000)

    # Take screenshot at the end
    page.screenshot(path="verification/screenshots/verification.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
