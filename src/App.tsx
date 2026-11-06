/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AndroidStatusBar } from './components/components/AndroidStatusBar';
import { Omnibar } from './components/components/Omnibar';
import { AndroidNavBar } from './components/components/AndroidNavBar';
import { SpeedDialHome } from './components/components/SpeedDialHome';
import { WebPageView } from './components/components/WebPageView';
import { VideoDubberModal } from './components/VideoDubberModal';
import { VisualSearchModal } from './components/VisualSearchModal';
import { AndroidAppInstallerModal } from './components/AndroidAppInstallerModal';
import { AIChatModal } from './components/AIChatModal';
import { VideoDownloaderModal } from './components/VideoDownloaderModal';
import { TabsManager } from './components/TabsManager';
import { BrowserDrawer } from './components/BrowserDrawer';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { usePWAInstall } from './hooks/usePWAInstall';
import { WallpaperSelectorModal } from './components/WallpaperSelectorModal';
import { DubbingPlatformModal } from './components/DubbingPlatformModal';
import { WALOW_WALLPAPERS, Wallpaper } from './data/wallpapers';
import { Tab, SearchEngine, Bookmark, HistoryItem } from './types/browser';
import { Smartphone, Monitor, Sparkles } from 'lucide-react';

export default function App() {
  const { isInstallable, isInstalled, install } = usePWAInstall();

  // Wallpapers state
  const [currentWallpaper, setCurrentWallpaper] = useState<Wallpaper>(() => {
    const saved = localStorage.getItem('walow_wallpaper_id');
    const found = WALOW_WALLPAPERS.find((w) => w.id === saved);
    return found || WALOW_WALLPAPERS[0];
  });
  const [isWallpaperModalOpen, setIsWallpaperModalOpen] = useState(false);
  const [isDubbingPlatformModalOpen, setIsDubbingPlatformModalOpen] = useState(false);

  // Tabs state
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: 'tab-1',
      title: 'الصفحة الرئيسية',
      url: 'walow://home',
      isLoading: false,
      history: ['walow://home'],
      historyIndex: 0,
      isIncognito: false,
    },
  ]);
  const [activeTabId, setActiveTabId] = useState<string>('tab-1');
  const [isIncognitoMode, setIsIncognitoMode] = useState<boolean>(false);

  // Browser Settings & Features
  const [selectedEngine, setSelectedEngine] = useState<SearchEngine>('walow-ai');
  const [adBlockEnabled, setAdBlockEnabled] = useState<boolean>(true);
  const [adBlockCount, setAdBlockCount] = useState<number>(14);
  const [isDesktopMode, setIsDesktopMode] = useState<boolean>(false);
  const [isPhoneFrameMode, setIsPhoneFrameMode] = useState<boolean>(false);

  // Modals
  const [isVideoDubberOpen, setIsVideoDubberOpen] = useState(false);
  const [dubberInitialVideo, setDubberInitialVideo] = useState<{ url?: string; title?: string }>({});
  const [isVisualSearchOpen, setIsVisualSearchOpen] = useState(false);
  const [visualSearchInitialImage, setVisualSearchInitialImage] = useState<string | undefined>(undefined);
  const [isAppInstallerOpen, setIsAppInstallerOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isVideoDownloaderOpen, setIsVideoDownloaderOpen] = useState(false);
  const [downloaderInitialData, setDownloaderInitialData] = useState<{ url?: string; title?: string }>({});
  const [isTabsManagerOpen, setIsTabsManagerOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showInstallGuide, setShowInstallGuide] = useState(false);

  // Bookmarks & History
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Get active tab
  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  // Navigation handler
  const handleNavigate = (input: string) => {
    let targetUrl = input.trim();

    if (!targetUrl) return;

    if (targetUrl === 'walow://home' || targetUrl === 'home') {
      targetUrl = 'walow://home';
    } else if (targetUrl.startsWith('http://') || targetUrl.startsWith('https://')) {
      // Direct URL
    } else if (targetUrl.includes('.') && !targetUrl.includes(' ')) {
      // Looks like a domain name
      targetUrl = `https://${targetUrl}`;
    } else {
      // It's a search query
      targetUrl = `search://${encodeURIComponent(targetUrl)}`;
    }

    setTabs((prevTabs) =>
      prevTabs.map((t) => {
        if (t.id === activeTabId) {
          const newHistory = [...t.history.slice(0, t.historyIndex + 1), targetUrl];
          return {
            ...t,
            url: targetUrl,
            title:
              targetUrl === 'walow://home'
                ? 'الصفحة الرئيسية'
                : targetUrl.startsWith('search://')
                ? `بحث: ${decodeURIComponent(targetUrl.replace('search://', ''))}`
                : targetUrl.replace(/^https?:\/\//, ''),
            history: newHistory,
            historyIndex: newHistory.length - 1,
            isLoading: true,
          };
        }
        return t;
      })
    );

    // Record in history if not incognito
    if (!activeTab.isIncognito && targetUrl !== 'walow://home') {
      setHistory((prev) => [
        {
          id: String(Date.now()),
          title: targetUrl,
          url: targetUrl,
          timestamp: Date.now(),
        },
        ...prev.slice(0, 50),
      ]);
    }

    // Simulate page load completion
    setTimeout(() => {
      setTabs((prevTabs) =>
        prevTabs.map((t) => (t.id === activeTabId ? { ...t, isLoading: false } : t))
      );
      if (adBlockEnabled) {
        setAdBlockCount((c) => c + Math.floor(Math.random() * 3) + 1);
      }
    }, 600);
  };

  // Back navigation
  const handleGoBack = () => {
    if (activeTab.historyIndex > 0) {
      const newIndex = activeTab.historyIndex - 1;
      const prevUrl = activeTab.history[newIndex];
      setTabs((prev) =>
        prev.map((t) =>
          t.id === activeTabId
            ? {
                ...t,
                url: prevUrl,
                historyIndex: newIndex,
                title: prevUrl === 'walow://home' ? 'الصفحة الرئيسية' : prevUrl,
              }
            : t
        )
      );
    }
  };

  // Forward navigation
  const handleGoForward = () => {
    if (activeTab.historyIndex < activeTab.history.length - 1) {
      const newIndex = activeTab.historyIndex + 1;
      const nextUrl = activeTab.history[newIndex];
      setTabs((prev) =>
        prev.map((t) =>
          t.id === activeTabId
            ? {
                ...t,
                url: nextUrl,
                historyIndex: newIndex,
                title: nextUrl === 'walow://home' ? 'الصفحة الرئيسية' : nextUrl,
              }
            : t
        )
      );
    }
  };

  // Home navigation
  const handleGoHome = () => {
    handleNavigate('walow://home');
  };

  // Reload current page
  const handleReload = () => {
    setTabs((prev) =>
      prev.map((t) => (t.id === activeTabId ? { ...t, isLoading: true } : t))
    );
    setTimeout(() => {
      setTabs((prev) =>
        prev.map((t) => (t.id === activeTabId ? { ...t, isLoading: false } : t))
      );
    }, 700);
  };

  // Add new tab
  const handleNewTab = (isIncognito: boolean = false) => {
    const newId = `tab-${Date.now()}`;
    const newTabObj: Tab = {
      id: newId,
      title: isIncognito ? 'علامة تبويب خاصة' : 'صفحة رئيسية جديدة',
      url: 'walow://home',
      isLoading: false,
      history: ['walow://home'],
      historyIndex: 0,
      isIncognito: isIncognito,
    };
    setTabs((prev) => [...prev, newTabObj]);
    setActiveTabId(newId);
    setIsIncognitoMode(isIncognito);
    setIsTabsManagerOpen(false);
  };

  // Close tab
  const handleCloseTab = (id: string) => {
    setTabs((prev) => {
      const remaining = prev.filter((t) => t.id !== id);
      if (remaining.length === 0) {
        // Always keep at least 1 tab
        const defaultTab: Tab = {
          id: `tab-${Date.now()}`,
          title: 'الصفحة الرئيسية',
          url: 'walow://home',
          isLoading: false,
          history: ['walow://home'],
          historyIndex: 0,
          isIncognito: false,
        };
        setActiveTabId(defaultTab.id);
        return [defaultTab];
      }
      if (activeTabId === id) {
        setActiveTabId(remaining[remaining.length - 1].id);
      }
      return remaining;
    });
  };

  // Video Dubbing launcher helper
  const handleOpenVideoDubber = (videoUrl?: string, title?: string) => {
    setDubberInitialVideo({ url: videoUrl, title });
    setIsVideoDubberOpen(true);
  };

  // Visual Search launcher helper
  const handleOpenVisualSearch = (imageUrl?: string) => {
    setVisualSearchInitialImage(imageUrl);
    setIsVisualSearchOpen(true);
  };

  // Share current URL
  const handleShare = () => {
    if (navigator.share && activeTab.url !== 'walow://home') {
      navigator.share({
        title: activeTab.title,
        url: activeTab.url,
      });
    } else {
      navigator.clipboard.writeText(activeTab.url);
      alert('تم نسخ الرابط إلى الحافظة!');
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#070a14] flex flex-col items-center justify-center font-['Tajawal','Plus_Jakarta_Sans',sans-serif]">
      {/* Top Device Frame Switcher (Useful when viewing on large desktop screens) */}
      <div className="hidden lg:flex items-center gap-3 py-1 px-4 mb-1 rounded-full bg-slate-900/80 border border-indigo-950 text-xs text-slate-400 z-50">
        <span className="font-semibold text-purple-300">طريقة العرض:</span>
        <button
          onClick={() => setIsPhoneFrameMode(false)}
          className={`px-3 py-1 rounded-full transition flex items-center gap-1.5 ${
            !isPhoneFrameMode
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold'
              : 'hover:text-white'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>ملء الشاشة</span>
        </button>
        <button
          onClick={() => setIsPhoneFrameMode(true)}
          className={`px-3 py-1 rounded-full transition flex items-center gap-1.5 ${
            isPhoneFrameMode
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold'
              : 'hover:text-white'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>محاكاة هاتف أندرويد</span>
        </button>
      </div>

      {/* Main Browser Canvas Container */}
      <main
        className={`w-full h-full flex flex-col bg-[#0b0f1d] shadow-2xl overflow-hidden relative transition-all duration-300 ${
          isPhoneFrameMode
            ? 'max-w-[440px] max-h-[92vh] rounded-[44px] border-[10px] border-slate-900 ring-2 ring-purple-500/30'
            : 'max-w-full max-h-full'
        }`}
      >
        {/* Android System Status Bar */}
        <AndroidStatusBar isIncognito={activeTab.isIncognito} />

        {/* Omnibar (Address & Search Bar with Action Buttons) */}
        <Omnibar
          currentUrl={activeTab.url}
          isLoading={activeTab.isLoading}
          isIncognito={activeTab.isIncognito}
          adBlockCount={adBlockCount}
          selectedEngine={selectedEngine}
          onNavigate={handleNavigate}
          onReload={handleReload}
          onSelectEngine={setSelectedEngine}
          onOpenVisualSearch={() => handleOpenVisualSearch()}
          onOpenVideoDubber={() => handleOpenVideoDubber()}
          onOpenAppInstaller={() => setIsAppInstallerOpen(true)}
          onOpenVideoDownloader={(url?: string, title?: string) => {
            setDownloaderInitialData({ url, title });
            setIsVideoDownloaderOpen(true);
          }}
          onToggleAdBlock={() => setAdBlockEnabled(!adBlockEnabled)}
          adBlockEnabled={adBlockEnabled}
        />

        {/* PWA Home Screen Prompt Banner */}
        <PWAInstallBanner
          showManualModal={showInstallGuide}
          onCloseManualModal={() => setShowInstallGuide(false)}
        />

        {/* Browser Content Area with Active Custom Wallpaper */}
        <div
          className="flex-1 w-full overflow-hidden relative transition-all duration-500"
          style={{ background: currentWallpaper.cssBackground }}
        >
          {activeTab.url === 'walow://home' ? (
            <SpeedDialHome
              onNavigate={handleNavigate}
              onOpenVideoDubber={handleOpenVideoDubber}
              onOpenVisualSearch={handleOpenVisualSearch}
              onOpenAppInstaller={() => setIsAppInstallerOpen(true)}
              onOpenWallpaperSelector={() => setIsWallpaperModalOpen(true)}
              onOpenDubbingPlatform={() => setIsDubbingPlatformModalOpen(true)}
              onOpenAIChat={() => setIsAIChatOpen(true)}
              onOpenVideoDownloader={(url?: string, title?: string) => {
                setDownloaderInitialData({ url, title });
                setIsVideoDownloaderOpen(true);
              }}
              onInstallPWA={() => setShowInstallGuide(true)}
              isInstalled={isInstalled}
              selectedEngine={selectedEngine}
              currentWallpaperName={currentWallpaper.name}
            />
          ) : (
            <WebPageView
              url={activeTab.url}
              isDesktopMode={isDesktopMode}
              onOpenVideoDubberWithUrl={handleOpenVideoDubber}
              onOpenVisualSearchWithUrl={handleOpenVisualSearch}
              onOpenVideoDownloader={(url?: string, title?: string) => {
                setDownloaderInitialData({ url, title });
                setIsVideoDownloaderOpen(true);
              }}
              onNavigate={handleNavigate}
              selectedEngine={selectedEngine}
            />
          )}
        </div>

        {/* Android Bottom Navigation Bar */}
        <AndroidNavBar
          canGoBack={activeTab.historyIndex > 0}
          canGoForward={activeTab.historyIndex < activeTab.history.length - 1}
          tabsCount={tabs.length}
          isIncognito={activeTab.isIncognito}
          onGoBack={handleGoBack}
          onGoForward={handleGoForward}
          onGoHome={handleGoHome}
          onOpenTabs={() => setIsTabsManagerOpen(true)}
          onOpenMenu={() => setIsDrawerOpen(true)}
          onOpenInstall={() => setShowInstallGuide(true)}
        />

        {/* Modals & Dialogs */}
        <VideoDubberModal
          isOpen={isVideoDubberOpen}
          onClose={() => setIsVideoDubberOpen(false)}
          initialVideoUrl={dubberInitialVideo.url}
          initialVideoTitle={dubberInitialVideo.title}
        />

        <VisualSearchModal
          isOpen={isVisualSearchOpen}
          onClose={() => setIsVisualSearchOpen(false)}
          onSearchInBrowser={handleNavigate}
          initialImageUrl={visualSearchInitialImage}
        />

        <AndroidAppInstallerModal
          isOpen={isAppInstallerOpen}
          onClose={() => setIsAppInstallerOpen(false)}
          onInstallCurrentSiteAsApp={() => setShowInstallGuide(true)}
          currentSiteTitle={activeTab.title}
          currentSiteUrl={activeTab.url}
        />

        <AIChatModal
          isOpen={isAIChatOpen}
          onClose={() => setIsAIChatOpen(false)}
          onSetAsWallpaper={(wp) => {
            setCurrentWallpaper(wp);
            localStorage.setItem('walow_wallpaper_id', wp.id);
          }}
          onInspectImageInLens={(img) => handleOpenVisualSearch(img)}
        />

        <VideoDownloaderModal
          isOpen={isVideoDownloaderOpen}
          onClose={() => setIsVideoDownloaderOpen(false)}
          initialVideoUrl={downloaderInitialData.url}
          initialTitle={downloaderInitialData.title}
        />

        <WallpaperSelectorModal
          isOpen={isWallpaperModalOpen}
          onClose={() => setIsWallpaperModalOpen(false)}
          selectedWallpaperId={currentWallpaper.id}
          onSelectWallpaper={(wp) => {
            setCurrentWallpaper(wp);
            localStorage.setItem('walow_wallpaper_id', wp.id);
          }}
        />

        <DubbingPlatformModal
          isOpen={isDubbingPlatformModalOpen}
          onClose={() => setIsDubbingPlatformModalOpen(false)}
        />

        <TabsManager
          isOpen={isTabsManagerOpen}
          tabs={tabs}
          activeTabId={activeTabId}
          isIncognitoMode={isIncognitoMode}
          onSelectTab={setActiveTabId}
          onCloseTab={handleCloseTab}
          onNewTab={handleNewTab}
          onToggleIncognitoMode={() => setIsIncognitoMode(!isIncognitoMode)}
          onCloseManager={() => setIsTabsManagerOpen(false)}
        />

        <BrowserDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          isInstallable={isInstallable}
          isInstalled={isInstalled}
          isDesktopMode={isDesktopMode}
          adBlockEnabled={adBlockEnabled}
          onInstallPWA={() => setShowInstallGuide(true)}
          onOpenVideoDubber={() => handleOpenVideoDubber()}
          onOpenVisualSearch={() => handleOpenVisualSearch()}
          onOpenAppInstaller={() => setIsAppInstallerOpen(true)}
          onOpenWallpapers={() => setIsWallpaperModalOpen(true)}
          onOpenDubbingPlatform={() => setIsDubbingPlatformModalOpen(true)}
          onToggleDesktopMode={() => setIsDesktopMode(!isDesktopMode)}
          onToggleAdBlock={() => setAdBlockEnabled(!adBlockEnabled)}
          onOpenBookmarks={() => alert('الإشارات المرجعية محفوظة في شاشة المتصفح الرئيسية.')}
          onOpenHistory={() =>
            alert(
              `سجل التصفح:\n${
                history.map((h) => `- ${h.title}`).join('\n') || 'لا يوجد سجل تصفح بعد'
              }`
            )
          }
          onShare={handleShare}
        />
      </main>
    </div>
  );
}
