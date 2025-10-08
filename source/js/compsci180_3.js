(function() {
    // Wait for DOM to be ready
    function init() {
        const stage = document.getElementById('blendStage');
        const instructions = document.getElementById('blendInstructions');
        const resetButton = document.getElementById('resetButton');
        
        // Safety check: ensure elements exist
        if (!stage || !instructions || !resetButton) {
            console.error('Blend animation elements not found');
            return;
        }
        
        let isAnimating = false;
        let isMerged = false;

        function startAnimation() {
            if (isAnimating || isMerged) return;
            
            isAnimating = true;
            instructions.classList.add('hidden');
            
            // Phase 1: Move images closer
            stage.classList.add('animating');
            
            // Phase 2: Merge and show result
            setTimeout(() => {
                stage.classList.remove('animating');
                stage.classList.add('merged');
                isAnimating = false;
                isMerged = true;
                resetButton.classList.add('visible');
            }, 1500);
        }

        function resetAnimation() {
            stage.classList.remove('animating', 'merged');
            instructions.classList.remove('hidden');
            resetButton.classList.remove('visible');
            isMerged = false;
            isAnimating = false;
        }

        stage.addEventListener('click', startAnimation);
        resetButton.addEventListener('click', resetAnimation);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();