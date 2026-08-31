from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.goto("http://localhost:4173")
    page.wait_for_timeout(500)

    # Need to be in Game view to see the MoveHistory and CapturedPieces
    page.get_by_role("button", name="Play Game").click()
    page.wait_for_timeout(500)

    # 1. e4 e5
    page.locator("[data-testid='e2']").drag_to(page.locator("[data-testid='e4']"))
    page.wait_for_timeout(500)
    page.locator("[data-testid='e7']").drag_to(page.locator("[data-testid='e5']"))
    page.wait_for_timeout(500)

    # 2. Nf3 Nc6
    page.locator("[data-testid='g1']").drag_to(page.locator("[data-testid='f3']"))
    page.wait_for_timeout(500)
    page.locator("[data-testid='b8']").drag_to(page.locator("[data-testid='c6']"))
    page.wait_for_timeout(500)

    # 3. Nxe5 (capture)
    page.locator("[data-testid='f3']").drag_to(page.locator("[data-testid='e5']"))
    page.wait_for_timeout(500)

    # 4. Nxe5 (capture)
    page.locator("[data-testid='c6']").drag_to(page.locator("[data-testid='e5']"))
    page.wait_for_timeout(500)

    # We should now see captured pieces on both sides in the UI
    page.screenshot(path="verification_capture.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(record_video_dir="videos")
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
